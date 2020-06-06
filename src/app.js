function displayDate (timestamp)
{ let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days [date.getDay()];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = months[date.getMonth()] ;
    return `${day} ${month} <br/> ${hours}:${minutes} `
}

function displayTemperature(response) {
    console.log (response.data)
    let cityElement = document.querySelector("#city")
    let descriptionElement = document.querySelector("#description")
    let temperatureElement = document.querySelector("#temperature")
    let dayElement = document.querySelector("#date")
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = `It's ${response.data.weather[0].description}`;
    dayElement.innerHTML = displayDate(response.data.dt * 1000);
}
let city = "Porto"
let apiKey = "6da49f4c9efbefcf042ac4b59c666478";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature)
console.log (apiUrl)