# type: ignore
from typing import Union

from fastapi import FastAPI
from flights.flight import get_flight_info, get_airport_info, get_current_weather

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/flights/{flight_id}/{flight_date}")
async def get_flights(flight_id: str, flight_date: str):
    flight = get_flight_info(flight_id, flight_date)
    departure_information = get_airport_info(flight["departure_airport"])
    arrival_information = get_airport_info(flight["arrival_airport"])
    weather = get_current_weather(flight, departure_information)
    return {"flightCode": flight_id, "flightDate": flight_date}
