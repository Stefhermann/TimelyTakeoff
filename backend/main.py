# type: ignore
from typing import Union

from fastapi import FastAPI
from flights.flight import get_current_airport, get_current_weather

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/flights/{flight_id}/{flight_date}")
async def get_flights(flight_id: str, flight_date: str):
    get_current_airport(flight_id)
    # weather = get_current_weather(
    # airport["latitude"], airport["longitude"], flight_date
    # )
    return {"flightCode": flight_id, "flightDate": flight_date}
