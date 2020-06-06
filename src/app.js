function displayTemperature(response) {
    console.log (response.data)
    let cityElement = document.querySelector("#city")
    let descriptionElement = document.querySelector("#description")
    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = `It's ${response.data.weather[0].description}`;
}

let apiKey = "6da49f4c9efbefcf042ac4b59c666478";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature)
console.log (apiUrl)