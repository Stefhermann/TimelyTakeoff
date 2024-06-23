# type: ignore
from typing import Union

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
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


# ml
regr_departure_model = joblib.load("timely-takeoff-model/src/results/regr_departure_model.joblib")
regr_arrival_model = joblib.load("timely-takeoff-model/src/results/regr_arrival_model.joblib")
clf_departure_model = joblib.load("timely-takeoff-model/src/results/clf_departure_model.joblib")
clf_arrival_model = joblib.load("timely-takeoff-model/src/results/clf_arrival_model.joblib")

class PredictRequest(BaseModel):
    features: list

@app.post("/predict")
async def predict(request: PredictRequest):
    try:
        X = request.features

        # Make predictions using all models
        regr_departure_prediction = regr_departure_model.predict([X])
        regr_arrival_prediction = regr_arrival_model.predict([X])
        clf_departure_prediction = clf_departure_model.predict([X])
        clf_arrival_prediction = clf_arrival_model.predict([X])

        # Return all predictions
        return {
            "regr_departure_prediction": regr_departure_prediction.tolist(),
            "regr_arrival_prediction": regr_arrival_prediction.tolist(),
            "clf_departure_prediction": clf_departure_prediction.tolist(),
            "clf_arrival_prediction": clf_arrival_prediction.tolist(),
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))