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
                conditionPic: `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
                humidity: response.main.humidity
                // conditionPic: response.weather[0].icon
            }
            console.log(cityObject)
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

    updateCity(cityName) {
        return $.ajax({
            url: `/city/${cityName}`,
            method: "PUT",
            success: function (response) {
                let cityToUpdate = this.cityData.find(x => x.name === cityName)
                cityToUpdate = response
                console.log(cityToUpdate)
                return response
            }
        })
    }
}
