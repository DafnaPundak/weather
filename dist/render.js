class Render {

    renderData (allCityData) {
        $(`#container`).empty()
        let source = $(`#city-template`).html()
        let template = Handlebars.compile(source)
        let newHTML = template( {allCityData} )
        $(`#container`).append(newHTML)

    }

}

