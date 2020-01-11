const renderer = new Render()
const tempManager = new TempManager()

const loadPage = function () {
    tempManager.getDataFromDB().then(data => {
        // console.log(data)
        renderer.renderData(tempManager.cityData)
    }).catch(err => {
        console.log(err)
    })
}

$(document).ready(function () {
    loadPage()
    // console.log("ready!")
});

const handleSearch = function () {
    let inputValue = $(`#cityInput`).val()
    tempManager.getCityData(inputValue).then(() => {
        renderer.renderData(tempManager.cityData)
    }).catch(err => {
        console.error(err)
    })
}

$(`#searchWeatherButton`).on('click', function () {
    handleSearch()
})

$(`#container`).on('click', '.saveCity', function () {
    let nameDomSave = $(this).siblings(`.cityName`).text()
    tempManager.saveCity(nameDomSave).then(data => {
        // console.log(data)
    })
})

$(`#container`).on('click', '.removeCity', function () {
    let nameDomRemove = $(this).siblings(`.cityName`).text()
    tempManager.removeCity(nameDomRemove).then(data => {
        // renderer.renderData(tempManager.cityData)
        // console.log(data)
    })
})

$(`#container`).on('click', '.refresh', function () {
    let nameToUpdate = $(this).siblings('.cityName').text()
    console.log(nameToUpdate)
    tempManager.updateCity(nameToUpdate).then(data => {
        renderer.renderData(tempManager.cityData)
        })
})