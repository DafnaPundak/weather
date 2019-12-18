class TempManager {

    constructor() {
        this.cityData = []
    }

    getDataFromDB() {
        return $.get(`/cities`).then(data => {
            this.cityData = data
            // return data
            // console.log(this.cityData)
        })
    }

    getCityData(cityName) {
        return $.get(`/city/${cityName}`).then(response => {
            response = JSON.parse(response.body)
            let cityObject = {
                name: response.name,
                temperature: response.main.temp,
                condition: response.weather[0].description,
                conditionPic: `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`

                // conditionPic: response.weather[0].icon
            }
            this.cityData.push(cityObject)
            // console.log(this.cityData)
        })
    }

    saveCity(cityName) {
        let cityDataObject = this.cityData.find(x => x.name === cityName)
        console.log(cityDataObject)
        return $.post(`/city`, cityDataObject).then(response => {
            // console.log(response)
            return response
        })
    }

    removeCity(cityName) {
        return $.ajax({
            url: `/city/${cityName}`,
            method: "DELETE",
            success: function (response) {
                this.cityData = response
                console.log(this.cityData)
                console.log(response)
                return response
            }
        })
    }
}
