const   apiKey  = 'bca373a7153c5d8019d5c18e3c7398b9',
        City    = require("../model/City"),
        express = require("express"),
        router  = express.Router(),
        axios   = require('axios')

const getUrl = city =>{
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
}

const getIcon = iconUrl =>{
    return `http://openweathermap.org/img/wn/${iconUrl}@2x.png`
}

const toCelsius = temp =>{
    return Math.round((temp - 273.15) * 10) / 10 
}

const generateWeatherData = weather =>{
    return {
        id:             weather.data._id,
        name:           weather.data.name, 
        temprature:     toCelsius(weather.data.main.temp),
        conditionPic:   getIcon(weather.data.weather[0].icon),
        condition:      weather.data.weather[0].description
    }
}

router.get("/city/:cityName", async (req,res) => {
    const url = getUrl(req.params.cityName)
    try {
        let weather = await axios.get(url)
        let cityWeather = generateWeatherData(weather)
        res.send(cityWeather)
    }
    catch (err) {
        res.send(err)
    }
})

router.get("/cities", async (req,res) =>{
    try{
        const cities = await City.find({})
        res.send(cities)
    }
    catch(err){
        res.send(err)
    }
})

router.post("/city" , async (req,res)=>{
    try {
        const city     = new City(req.body)
        const saveCity = await city.save() 
        res.send(saveCity)
    }
    catch(err){
        res.send(err)
    }
})
router.put("/city/:cityName" , async (req,res)=>{
    const cityName = req.params.cityName
    const url = getUrl(cityName)
    try {
        let weather = await axios.get(url)
        let cityWeather = generateWeatherData(weather)
        const updatedCity = await City.findOneAndUpdate(cityName ,cityWeather, {new:true})
        res.send(updatedCity)

    }
    catch(err){
        res.send(err)
    }
})

router.delete("/city/:name" , async (req , res) =>{
    try{
        const name        = req.params.name
        const deletedCity = await City.findOneAndDelete({name})
        res.send(deletedCity)
    } 
    catch(err){
        res.send(err)
    }
})
module.exports = router 