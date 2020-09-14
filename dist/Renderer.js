class Render{
    constructor(){

    }
    renderData = allCitiesData => {
        $("#city-input").val("")
        const   source   = $("#weather-template").html(),
                template = Handlebars.compile(source),
                weather  = template({allCitiesData})
        $("#cities-container").empty().append(weather)
    }
}