const   render          = new Render(),
        tempManager     = new TempManager(),
        $container      = $("#container"),
        $cityInput      = $('#city-input'),
        $searchButton   = $('#serach-button')


const loadPage = async () =>{
    await tempManager.getDataFromDB()
    render.renderData(tempManager.cityData)
}

const handleSearch = async cityInput =>{
    const cityData = await tempManager.getCityData(cityInput)
        render.renderData(cityData)
}

const capitalize = cityName =>{
    return  cityName.charAt(0).toUpperCase() + cityName.slice(1);
}

$searchButton.on('click', () =>{
    const currentSearch = $cityInput.val()
    if(currentSearch){
        let capitalized = capitalize(currentSearch)
        handleSearch(capitalized)
    }
})

$container.on('click' , ".add" , function(){
    const currentCity = $(this).closest(".city-container").data("id")
    tempManager.saveCity(currentCity)
    $(this).addClass("added")
    loadPage()
})

$container.on('click' , ".remove" , function(){
    const currentCity = $(this).closest(".city-container").data("id")
    tempManager.removeCity(currentCity)
    loadPage()
})

$container.on('click' , ".refresh" , async function(){
    const currentCity = $(this).closest(".city-container").data("id")
    await tempManager.updateCity(currentCity)
    render.renderData(tempManager.cityData)
})



$( document ).ready(loadPage())