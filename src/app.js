function displayDate (timestamp)
{ let now = new Date(timestamp);
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days [now.getDay()];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = months[now.getMonth()] ;
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${day} ${date} ${month} <br/> ${hours}:${minutes} ${ampm} `
}

function displayTemperature(response) {
    console.log (response.data)
    let cityElement = document.querySelector("#city")
    let descriptionElement = document.querySelector("#description")
    let temperatureElement = document.querySelector("#temperature")
    let dayElement = document.querySelector("#date")
    let iconElement = document.querySelector ("#icon")
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = `It's ${response.data.weather[0].description}`;
    dayElement.innerHTML = displayDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
}

function search(city) {
let apiKey = "6da49f4c9efbefcf042ac4b59c666478";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city-input");
    search(cityElement.value);
    
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);