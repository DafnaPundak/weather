class TempManager {
  constructor() {
    this.cityData = [];
  }

  getDataFromDB() {
    return $.get(`/cities`).then((data) => {
      let reverseData = [];
      for (let i = data.length - 1; i > 0; i--) {
        reverseData.push(data[i]);
      }
      this.cityData = reverseData;
    });
  }

  getCityData(cityName) {
    return $.get(`/city/${cityName}`).then((response) => {
      let cityObject = {
        name: response.name,
        temperature: response.main.temp,
        condition: response.weather[0].description,
        conditionPic: `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
        humidity: response.main.humidity,
      };
      this.cityData.unshift(cityObject);
    });
  }

  saveCity(cityName) {
    let cityDataObject = this.cityData.find((x) => x.name === cityName);
    return $.post(`/city`, cityDataObject).then((response) => {
      return response;
    });
  }

  removeCity(cityName) {
    return $.ajax({
      url: `/city/${cityName}`,
      method: "DELETE",
      success: function (response) {
        this.cityData = response;
        return response;
      },
    });
  }

  updateCity(cityName) {
    return $.ajax({
      url: `/city/${cityName}`,
      method: "PUT",
      success: function (response) {
        let cityToUpdate = this.cityData.find((x) => x.name === cityName);
        cityToUpdate = response;
        console.log(cityToUpdate);
        return response;
      },
    });
  }
}
