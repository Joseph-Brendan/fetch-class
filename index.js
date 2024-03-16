let apiKey = "da3ee8d783d3907151616f952f02d3f1"
let input = document.getElementById("cityInput")
let form = document.getElementById("form")
let weatherResultContainer = document.getElementById("weather-result-container")

form.addEventListener("submit", function(event){
    event.preventDefault()
    let city = input.value

    if(city.length > 0){
        try{
            collectWeatherDetails(city)
            form.reset()
        }catch{
            // let error = document.createElement("p").textContent = "Error"
            // weatherResultContainer.append(error)
        }
    }
})

function collectWeatherDetails(city){

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    fetch(url).then(function(response){
        return response.json()
    }).then(function(data){
        showWeatherDetailsOnUI(data)
        console.log(data)
    })
}

function showWeatherDetailsOnUI(data){

    weatherResultContainer.innerHTML = " "
    let city = input.value
    let rawTemperature = data.main.temp
    let humidity = data.main.humidity

    // City Display Elements
    let nameOfCityContainer = document.createElement("div")
    nameOfCityContainer.classList.add("name-of-city-container")

    let nameOfCityText = document.createElement("h1")
    nameOfCityText.textContent = data.name


    //Current Temperature Elements
    let currentTempContainer = document.createElement("div")
    currentTempContainer.classList.add("current-temperature-container")

    let displayTempTitle = document.createElement("p")
    displayTempTitle.textContent = "Current Temperature"

    let displayCurrentTemp = document.createElement("h5")
    displayCurrentTemp.textContent = `${(rawTemperature - 273.15).toFixed(1)}°C`


    //Humidity Elements
    let displayHumContainer = document.createElement("div")
    displayHumContainer.classList.add("humidity-container")

    let humidityTitle = document.createElement("p")
    humidityTitle.textContent = "Humidity"

    let displayHumidity = document.createElement("h5")
    displayHumidity.textContent = humidity


    nameOfCityContainer.append(nameOfCityText)
    currentTempContainer.append(displayTempTitle, displayCurrentTemp)
    displayHumContainer.append(humidityTitle, displayHumidity)
    weatherResultContainer.append(nameOfCityContainer, currentTempContainer, displayHumContainer)
}