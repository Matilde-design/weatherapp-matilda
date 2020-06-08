function displayDate (timestamp)
{ let now = new Date(timestamp);
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes= `0${minutes}`;
      }
    let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days [now.getDay()];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = months[now.getMonth()] ;
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${day} ${date} ${month} <br/> ${hours}:${minutes} ${ampm} `
}

function forecastHours(timestamp) {
    let now = new Date(timestamp)
    let hours = now.getHours();
    return `${hours}:00`;
}

function displayTemperature(response) {
    console.log (response.data)
    let cityElement = document.querySelector("#city")
    let descriptionElement = document.querySelector("#description")
    let temperatureElement = document.querySelector("#temperature")
    let dayElement = document.querySelector("#date")
    let iconElement = document.querySelector ("#icon")


    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = `${response.data.name}`;
    descriptionElement.innerHTML = `It's ${response.data.weather[0].description}`;
    dayElement.innerHTML = displayDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
}

function showForecast(response){
    let forecastElement = document.querySelector("#weatherForecast");
    forecastElement.innerHTML = null;
    let forecast =  null;
    
    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
    forecastElement.innerHTML += 
    ` <div class="col-2">
    <p><small>${forecastHours(forecast.dt*1000)}</small><br><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" class="icon"> <br> ${Math.round(forecast.main.temp_max)}º | <small class="align-middle">${Math.round(forecast.main.temp_min)}º</p></small>
    </div>
</div>`;
}
}

function search(city) {
let apiKey = "6da49f4c9efbefcf042ac4b59c666478";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

apiUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showForecast);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city-input");
    search(cityElement.value);
    
}

function searchLocation (position) {
let key = "6da49f4c9efbefcf042ac4b59c666478";
let lat = position.coords.latitude;
let long = position.coords.longitude;

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}&units=metric`
axios.get(apiUrl).then(showForecast);

}

function displayCurrentLocation(event)
{  event.preventDefault();
navigator.geolocation.getCurrentPosition (searchLocation);}

function displayfahrenheiTemperature (event) {
    event.preventDefault();

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheiTemperature = (celsiusTemperature*9)/5+32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature (event) {
    event.preventDefault();

    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;

let currentLocationIcon = document.querySelector("#current-location")
currentLocationIcon.addEventListener ("click", displayCurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("click", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener ("click", displayfahrenheiTemperature);

let celsiusLink = document.querySelector ("#celsius");
celsiusLink.addEventListener ("click", displayCelsiusTemperature);

search ("Porto")