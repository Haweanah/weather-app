# Frontend Mentor - Weather App Solution

This is my solution to the Frontend Mentor Weather App challenge. The project allowed me to practice working with APIs, handling asynchronous data in React, managing application state, and building a responsive user interface that provides real-time weather information.

## Table of Contents

* [Overview](#overview)

  * [The Challenge](#the-challenge)
  * [Screenshot](#screenshot)
  * [Links](#links)
* [My Process](#my-process)

  * [Built With](#built-with)
  * [What I Learned](#what-i-learned)
  * [Challenges Faced](#challenges-faced)
  * [Continued Development](#continued-development)
* [Author](#author)

## Overview

### The Challenge

Users should be able to:

* Search for weather information by entering a city name
* View current weather conditions including temperature, weather icon, date, and location
* See additional weather details such as humidity, wind speed, precipitation, and feels-like temperature
* View a multi-day weather forecast
* View hourly weather forecasts
* Switch between Metric and Imperial measurement units
* Receive feedback when a city cannot be found
* See loading states while data is being fetched
* View a responsive layout that works across desktop, tablet, and mobile devices
* Experience hover and focus states for interactive elements

### Screenshot

![Weather App Screenshot](./screenshot.png)
 
### Links

* Solution URL: https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49?tab=report
* Live Site URL: https://haweanah-weather-app.onrender.com/

## My Process

### Built With

* React
* JavaScript (ES6+)
* CSS3
* Flexbox
* CSS Grid
* Mobile-first workflow
* OpenWeather API
* Open-Meteo API
* Vite

## What I Learned

This project helped me become more comfortable working with multiple APIs in a single application. I learned how to:

* Fetch and combine data from different API sources
* Manage multiple loading and error states
* Work with React's `useEffect` hook for data fetching
* Handle asynchronous operations more effectively
* Structure a React application using reusable components
* Implement responsive layouts using Flexbox and CSS Grid

One area I was particularly proud of was handling location-based weather searches and fetching related forecast data only after obtaining the required coordinates.

```javascript
useEffect(() => {
  if (!coordinates) return;

  async function fetchHourlyData() {
    const { lat, lon } = coordinates;

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code&forecast_days=7`
    );

    const data = await response.json();

    setHourlyData(
      data.hourly.time.map((time, index) => ({
        time,
        temp: data.hourly.temperature_2m[index],
        weatherCode: data.hourly.weather_code[index]
      }))
    );
  }

  fetchHourlyData();
}, [coordinates]);
```

## Challenges Faced

One of the biggest challenges was managing the different loading states for current weather, daily forecasts, and hourly forecasts without causing unnecessary renders or displaying incomplete information.

I also spent time improving the user experience by:

* Creating loading skeletons
* Handling API failures gracefully
* Displaying helpful error messages
* Improving search suggestions and user interactions

These challenges gave me a much better understanding of React state management and application flow.

## Continued Development

There are several features I would like to add in future versions:

* Weather maps
* Air quality information
* Sunrise and sunset times
* Favorite/saved cities
* Dark and light themes
* Search history
* Progressive Web App (PWA) support
* More advanced weather charts and visualizations

I would also like to improve performance by introducing caching and reducing unnecessary API requests.

## Author

**Hauwa Abdulkadir**

* GitHub: https://github.com/haweanah
* Frontend Mentor: https://www.frontendmentor.io/profile/Haweanah
* LinkedIn: https://www.linkedin.com/in/hauwa-abdulkadir-6281b72bb/

## Acknowledgements

A big thank you to Frontend Mentor for providing realistic challenges that help developers practice real-world skills.

This project was also a great opportunity to strengthen my React fundamentals, improve my understanding of API integration, and gain experience building a complete, responsive application from start to finish.
