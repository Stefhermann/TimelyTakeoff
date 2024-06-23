# type: ignore
import csv
import pandas as pd
import requests
import os
import joblib
from dotenv import load_dotenv

load_dotenv()

cwd = os.getcwd()


def parse_flight_code(flightCode: str) -> str:
    res = ""
    for c in flightCode:
        if c.isalpha():
            res += c
        else:
            return res
    return res


ACCESS_KEY = os.getenv("ACCESS_KEY")
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")


def get_airport_info(airport: str):
    df = pd.read_csv(cwd + "/flights/" + "iata-icao.csv")
    query = df.query(f'iata == "{airport}"')
    info = {
        "latitude": query["latitude"].values[0],
        "longitude": query["longitude"].values[0],
    }
    return info


def get_flight_info(code: str, date: str):
    # Find airport code from flight code

    params = {
        "access_key": ACCESS_KEY,
        "flight_iata": code,
    }
    api_result = requests.get("http://api.aviationstack.com/v1/flights", params)
    flights = api_result.json()["data"]
    flight = None
    for f in flights:
        if f["flight_date"] == date and f["flight_status"] == "scheduled":
            flight = f
            break
    if flight:
        departure_airport = flight["departure"]["iata"]
        departure_scheduled = flight["departure"]["scheduled"]
        departure_timezone = flight["departure"]["timezone"]
        arrival_airport = flight["arrival"]["iata"]
        arrival_scheduled = flight["arrival"]["scheduled"]
        arrival_timezone = flight["arrival"]["timezone"]

        flight = {
            "departure_airport": departure_airport,
            "departure_scheduled": departure_scheduled,
            "departure_timezone": departure_timezone,
            "arrival_airport": arrival_airport,
            "arrival_scheduled": arrival_scheduled,
            "arrival_timezone": arrival_timezone,
        }

    return flight


def get_current_weather(time: str, location: dict):

    params = {
        "location": f'{location["latitude"]}, {location["longitude"]}',
        "units": "metric",
        "timesteps": ["current"],
        "fields": [
            "precipitationIntensity",
            "rainIntensity",
            "snowIntensity",
            "cloudCover",
            "weatherCode",
            "windSpeedMetarTaf",
            "windDirectionMetarTaf",
        ],
        "startTime": time,
    }

    # fancy url

    url = f"https://api.tomorrow.io/v4/timelines?apikey={WEATHER_API_KEY}"


def get_current_weather(long: str, lat: str, date: str):
    print("Finding current weather")

    response = requests.post(url, json=params)
    print(response.text)


def preprocess_x(x: list):
    """Preprocess X before it goes to model for prediction."""
    regr_pp = joblib.load(
        "backend/timely-takeoff-model/src/results/regr_preprocessor.joblib"
    )
    # clf_pp = joblib.load(
    #     "backend/timely-takeoff-model/src/results/clf_preprocessor.joblib"
    # )
    #
    if not isinstance(x[0], list):
        x = [x]

    # Apply preprocessing
    regr_x_processed = regr_pp.transform(x)
    # clf_x_processed = clf_pp.transform(x)

    return regr_x_processed
