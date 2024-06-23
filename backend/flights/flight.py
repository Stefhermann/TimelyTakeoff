# type: ignore
import csv
import pandas as pd
import requests
import os
from dotenv import load_dotenv

import openmeteo_requests
import requests_cache
from retry_requests import retry

load_dotenv()

cwd = os.getcwd()

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


def get_current_weather(flight: dict, location: dict):

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
            "windGustMetarTaf",
        ],
        "startTime": flight["departure_scheduled"],
    }

    url = f"https://api.tomorrow.io/v4/timelines?apikey={WEATHER_API_KEY}"

    response = requests.post(url, json=params)
    print(response.text)
