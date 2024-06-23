import csv
import pandas as pd
import os
import joblib

cwd = os.getcwd()

def parse_flight_code(flightCode: str) -> str:
    res = ""
    for c in flightCode:
        if c.isalpha():
            res += c
        else:
            return res
    return res


def get_current_airport(flightCode: str):
    # Find airport code from flight code
    airportCode = parse_flight_code(flightCode)

    df = pd.read_csv(cwd + "/flights/" + "iata-icao.csv")

    # Find coordinates of airport
    print(df.head(10))
    print(df.query("iata == " + airportCode))
    return "Hello"


def get_current_weather(long: str, lat: str, date: str):
    print("Finding current weather")


def preprocess_x(x: list):
    """Preprocess X before it goes to model for prediction."""
    regr_pp = joblib.load("backend/timely-takeoff-model/src/results/regr_preprocessor.joblib")
    clf_pp = joblib.load("backend/timely-takeoff-model/src/results/clf_preprocessor.joblib")

    if not isinstance(x[0], list):
        x = [x]

    # Apply preprocessing
    regr_x_processed = regr_pp.transform(x)
    clf_x_processed = clf_pp.transform(x)

    return regr_x_processed, clf_x_processed