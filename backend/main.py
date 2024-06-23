# type: ignore
from typing import Union

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
from flights.flight import (
    get_flight_info,
    get_airport_info,
    get_current_weather,
    preprocess_x,
)
from geopy import distance
import datetime as dt

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/flights/{flight_id}/{flight_date}")
async def get_flight(flight_id: str, flight_date: str):
    flight = get_flight_info(flight_id, flight_date)
    if flight is None:
        raise HTTPException(status_code=404, detail="Flight not found")
    departure_information = get_airport_info(flight["departure_airport"])
    arrival_information = get_airport_info(flight["arrival_airport"])
    departure_weather = get_current_weather(
        flight["departure_scheduled"], departure_information
    )
    arrival_weather = get_current_weather(
        flight["arrival_scheduled"], arrival_information
    )
    pdw = departure_weather["timelines"][0]["intervals"][0]["values"]
    paw = arrival_weather["timelines"][0]["intervals"][0]["values"]
    airtime = 120
    miles = distance.distance(
        (departure_information["latitude"], departure_information["longitude"]),
        (arrival_information["latitude"], arrival_information["longitude"]),
    ).miles
    year, month, day = flight_date.split("-")
    dayofweek = dt.datetime(int(year), int(month), int(day)).weekday()
    reliabilityscore = 10
    departureHour = 12
    arrivalHour = 12
    x_list = [
        flight_date,
        flight["departure_airport"],
        flight["arrival_airport"],
        flight["departure_scheduled"],
        flight["arrival_scheduled"],
        airtime,
        miles,
        dayofweek,
        reliabilityscore,
        departureHour,
        arrivalHour,
        pdw["precipitationIntensity"],
        pdw["rainIntensity"],
        pdw["snowIntensity"],
        pdw["weatherCode"],
        pdw["cloudCover"],
        pdw["windSpeedMetarTaf"],
        pdw["windDirectionMetarTaf"],
        paw["precipitationIntensity"],
        paw["rainIntensity"],
        paw["snowIntensity"],
        paw["weatherCode"],
        paw["cloudCover"],
        paw["windSpeedMetarTaf"],
        paw["windDirectionMetarTaf"],
    ]
    return {"flight": flight, "x_list": x_list}


# ml
regr_departure_model = joblib.load(
    "timely-takeoff-model/src/results/regr_departure_model.joblib"
)
regr_arrival_model = joblib.load(
    "timely-takeoff-model/src/results/regr_arrival_model.joblib"
)
# clf_departure_model = joblib.load(
#     "timely-takeoff-model/src/results/clf_departure_model.joblib"
# )
# clf_arrival_model = joblib.load(
#     "timely-takeoff-model/src/results/clf_arrival_model.joblib"
# )


class PredictRequest(BaseModel):
    features: list


@app.post("/predict")
async def predict(request: PredictRequest):
    try:
        X = request.features

        regr = preprocess_x(X)

        # Make predictions using all models
        regr_departure_prediction = regr_departure_model.predict([regr])
        regr_arrival_prediction = regr_arrival_model.predict([regr])
        # clf_departure_prediction = clf_departure_model.predict([clf])
        # clf_arrival_prediction = clf_arrival_model.predict([clf])

        # Return all predictions
        return {
            "regr_departure_prediction": regr_departure_prediction.tolist(),
            "regr_arrival_prediction": regr_arrival_prediction.tolist(),
            # "clf_departure_prediction": clf_departure_prediction.tolist(),
            # "clf_arrival_prediction": clf_arrival_prediction.tolist(),
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
