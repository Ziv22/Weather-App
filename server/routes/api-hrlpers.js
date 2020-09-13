const   apiKey  = 'bca373a7153c5d8019d5c18e3c7398b9',

getUrl = city =>{
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
},

getIcon = iconUrl =>{
    return `http://openweathermap.org/img/wn/${iconUrl}@2x.png`
},

toCelsius = temp =>{
    return Math.round((temp - 273.15) * 10) / 10 
},

generateWeatherData = weather =>{
    return {
        id:             weather.data._id,
        name:           weather.data.name, 
        temprature:     toCelsius(weather.data.main.temp),
        conditionPic:   getIcon(weather.data.weather[0].icon),
        condition:      weather.data.weather[0].description
    }
}

module.exports = {generateWeatherData ,  getUrl}