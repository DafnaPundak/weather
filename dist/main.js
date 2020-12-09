const renderer = new Render();
const tempManager = new TempManager();

const loadPage = function () {
  tempManager
    .getDataFromDB()
    .then((data) => {
      renderer.renderData(tempManager.cityData);
    })
    .catch((err) => {
      console.log(err);
    });
};

$(document).ready(function () {
  loadPage();
});

const handleSearch = function () {
  let inputValue = $(`#cityInput`).val();
  tempManager
    .getCityData(inputValue)
    .then(() => {
      renderer.renderData(tempManager.cityData);
    })
    .catch((err) => {
      console.error(err);
    });
  $(`#cityInput`).val('');
};

$(`.searchWeatherButton`).on("click", function () {
  handleSearch();
});

$(`#container`).on("click", ".saveCity", function () {
  let nameDomSave = $(this).siblings(`.cityName`).text();
  tempManager.saveCity(nameDomSave).then(() => loadPage());
});

$(`#container`).on("click", ".removeCity", function () {
  let nameDomRemove = $(this).siblings(`.cityName`).text();
  tempManager.removeCity(nameDomRemove).then(() => loadPage());
});
