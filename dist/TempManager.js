class TempManager {
    constructor(){
        this.cityData = []
    }

    findCityByName = cityName => {
        let foundCity = this.cityData.find(c => c.name === cityName)
        return foundCity
    }

    // isUnique = cityName => {
    //     if(this.findCityByName(cityName)){
    //         return false
    //     }
    //     return true
    // }
    
    getDataFromDB = async () =>{
        try{
            let cities = await $.get('/cities')
            if(cities){
                this.cityData = [...cities]
            }
        } 
        catch(err){
            console.log(err)
        }
    }

    // getCityData = async (cityName) =>{
    //     try{
    //         // if(this.isUnique  (cityName)){
    //             let city = await $.get(`/city/${cityName}`)
    //             this.cityData.push(city)
    //         }
    //         return this.cityData
    //     }
    //     catch(err){
    //         console.log(err) 
    //     }
    // }
    getCityData = async (cityName) =>{
        try{
            // if(!this.findCityByName(cityName)){
                let city = await $.get(`/city/${cityName}`)
                console.log(city)
                this.cityData.push(city)
            // }
            return this.cityData
        }
        catch(err){
            console.log(err) 
        }
    }

    saveCity = async cityName =>{
        try{
            const newCity = this.findCityByName(cityName)        
            const saved = await $.post('/city', newCity)
            console.log(`saved ${saved.name}`)
        }
        catch(err){
            console.log(err)
        }
    }

    updateCity = async cityName =>{
        try {
            const updated = await $.ajax({url: `/city/${cityName}`, method: 'PUT'})
            const cityIndex = this.cityData.findIndex(c => c.name === cityName)
            this.cityData.splice(cityIndex, 1 , updated)
        }
        catch(err){
            console.log(err)
        }
    }

    removeCity = async cityName =>{     
        try{
            const deleted = await $.ajax({ url: `/city/${cityName}`, method: 'DELETE' })
            console.log(`deleted ${deleted.name}`)
        }
        catch(err){
            console.log(err)
        }
    }
}