## TimelyTakeoff

#### Never miss a flight again.

## Inspiration
While brainstorming, we recognized a gap in existing travel apps and websites—most provide status updates only based on airline data without considering other impactful factors like weather. We were inspired by the idea of creating a holistic tool that amalgamates extensive flight data with real-time weather updates, providing a one-stop solution for travelers to monitor their flight status efficiently. This tool would minimize travel anxiety by empowering users with the knowledge needed to make informed decisions, from adjusting departure times to planning alternative routes.

## What it does
TimelyTakeoff is a simple, no sign-up website for monitoring your upcoming flight. The user submits their flight number and date of the flight and our custom model predicts whether their flight will be on-time or delayed and by how many minutes.

## How we built it
Stefan and I (DB) immediately tackled different parts of the project. Stefan started with the front-end and APIs for live weather and flight tracking while I worked on sourcing data to train our model. 

On the data side, we started with a Kaggle dataset containing a substantial amount of U.S. continental flight data—much more than our macbooks would be capable of handling but it was a great start. Then we found a weather API that allowed us to get historical weather records at the latitude and longitudes of each airport in our dataset. We linked the airport codes from the Kaggle dataset with an intermediate dictionary we found online with records of airports across the globe and their corresponding latitude and longitude coordinates.

Stefan setup the foundations for the web app itself using a NextJS frontend with a FastAPI backend to make prototyping fast. He designed the theme and started organizing the website's pages to accomodate the requirements for the model. He did a ton of work connecting the dots so the user needed to enter the bare minimum information possible. It involved a ton of manipulations, calculations, and tangled api responses to satisfy the 30+ parameters to feed to the model!

## Challenges we ran into
Immediately we ran into issues with finding data and services that were palatable to our wallets. Initial searches resulted in the data we wanted being blocked via a monthly subscrition and I was even quoted $300 for historical weather data. Finding good data is ultimately a treasure hunt and its been an issue in almost every project I've done.

We also ran into issues with hosting and deploying things. Models with lots of parameters can get very big and I wasn't sure just how big until we got near the end so we ended up being unable to use the separate classification model that we trained which was significantly more performant (and therefore useful) than the regression model which is being used right now.

## Accomplishments that we're proud of
I am really proud of the design of the website, its simple and user-friendly which is just the way most people want it in my opinion and it has an elegant and simple style.

I am also very happy with the data cleaning and merging process. I would honestly post it to Kaggle and I might because there is not anything else like it on there currently. We historical weather data from the time and location of each departure and arrival for all flights and for a data geek like myself it was just beautiful to see the pipeline do its thing.

## What we learned
Parsing data from APIs is not fun and I wish we had a better foundation for dealing with this problem because our project relied on it HEAVILY. I guess we kind of just went and started without thinking about it and because of lack of efficiency I think we both had a combined 8 hours of sleep this weekend.

I also learned to not worry so much about code cleanliness during a hackathon but I still converted all though notebooks to proper python files!

## What's next for TimelyTakeoff
On the data side there are many many things I want to do to improve the model's performance. Our regressor could use a lot of work and part of that is being able to use all the data but we did not have enough time to train a model like that. I would also be intereste in adding years beyond 2022 and using some seasonal model like ARIMA to calculate the departure and arrival delay.

For the user we want to add text message alerts that would help keep user's updated as their flight comes up.

