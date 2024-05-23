const current_temp = document.querySelector("#current_temp");
const loc = document.querySelector("#location");
const search = document.querySelector("#search");
const address = document.querySelector("#place");
const time = document.querySelector("#time");
const max = document.querySelector(".max");
const min = document.querySelector(".min");
const icon = document.querySelector(".icon");
const weather = document.querySelector(".description");
const predict1 = document.querySelector("#predict1");
const predict2 = document.querySelector("#predict2");
const date1 = document.querySelector("#date1");
const date2 = document.querySelector("#date2");
const weather1 = document.querySelector("#weather1");
const weather2 = document.querySelector("#weather2");
const avg1 = document.querySelector("#avg1");
const avg2 = document.querySelector("#avg2");
const container = document.querySelector("body");

async function forecast(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=b6706fb8bcd04e938bf161025242105&q=${location}&days=3`,
      { mode: "cors" }
    );
    const data = await response.json();
    console.log(data);
    update(data);
    unsplash(data.current.condition.text);
  } catch (e) {
    alert(e);
  }
}

forecast("India");

function update(data) {
  current_temp.innerHTML = `${data.current.feelslike_c}&deg; C`;
  address.innerHTML = `${data.location.name}, ${data.location.region} ${data.location.country}`;
  time.innerHTML = `${data.location.localtime}`;
  max.innerHTML = `Max: ${data.forecast.forecastday[0].day.maxtemp_c}&deg; C`;
  min.innerHTML = `Min: ${data.forecast.forecastday[0].day.mintemp_c}&deg; C`;
  icon.src = data.current.condition.icon;
  weather.textContent = data.current.condition.text;
  //for predictions
  predict1.src = data.forecast.forecastday[1].day.condition.icon;
  predict2.src = data.forecast.forecastday[2].day.condition.icon;
  date1.textContent = data.forecast.forecastday[1].date;
  date2.textContent = data.forecast.forecastday[2].date;
  weather1.textContent = data.forecast.forecastday[1].day.condition.text;
  weather2.textContent = data.forecast.forecastday[2].day.condition.text;
  avg1.innerHTML = `Avg: ${data.forecast.forecastday[1].day.maxtemp_c}&deg; C`;
  avg2.innerHTML = `Avg: ${data.forecast.forecastday[2].day.maxtemp_c}&deg; C`;
}

search.addEventListener("click", () => {
  forecast(loc.value);
});

async function unsplash(query) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=YugS3a9SyLkKVyc7DxbtBlHe_dAr0O4h1AMZm8s9TEE`,
      { mode: "cors" }
    );
    const result = await response.json();
    console.log(result);
    container.style.background = `url(${result.results[0].urls.full}) no-repeat fixed center`;
  } catch (e) {
    alert(e);
  }
}
