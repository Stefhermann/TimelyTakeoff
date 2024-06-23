import re
import math
from datetime import datetime

from constants import RELIABILITY_SCORE_DICT

def calculate_reliability_score(flight_number: str):
    pattern = r'\d+'

    # Replace all occurrences of the pattern with an empty string
    result = re.sub(pattern, '', flight_number)

    rs = RELIABILITY_SCORE_DICT[result]

    return rs


def calculate_dow(date: str):
    dt = datetime.strptime(date, "%Y-%m-%d")
    day_index = dt.weekday()  # This returns 0 for Monday and 6 for Sunday
    return day_index


def calculate_airtime(departure_time, arrival_time):
    duration = arrival_time - departure_time
    # Convert duration to total minutes
    total_minutes = int(duration.total_seconds() / 60)

    return total_minutes

def get_hour_as_int(time):
    # Extract hour from the departure time
    hour = time.hour

    return hour
