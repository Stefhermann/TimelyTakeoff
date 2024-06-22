import csv
import pandas as pd
import os

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
