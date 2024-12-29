const input_search = document.getElementById("inp-ser");
const findButton = document.querySelector(".button-1");

// Trigger API call and data display when the button is clicked
findButton.addEventListener('click', function () {
    const town = input_search.value.trim();
    if (town) {
        api_data(town);
    }
});

async function api_data(town) {
    if (town.length > 2) {
        let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${town}&days=3&key=e04c1d3c724f4dedb9a171901241812`);
        let data = await result.json();
        display(data);
    }
}

function display(data) {
    let day_one = new Date(data.current.last_updated);
    document.getElementById("day_one_name").innerHTML = day_one.toLocaleString('en-us', { weekday: 'long' });
    document.getElementById("month_one_name").innerHTML = day_one.getDate() + " " + day_one.toLocaleString('en-us', { month: 'long' });
    document.getElementById("location").innerHTML = data.location.name;
    document.getElementById("degree").innerHTML = data.current.temp_c + "°C";
    document.getElementById("image").setAttribute('src', `https:${data.current.condition.icon}`);
    document.getElementById("condition").innerHTML = data.current.condition.text;
    document.getElementById("umberella").innerHTML = data.current.humidity + '%';
    document.getElementById("wind").innerHTML = data.current.wind_kph + " km/h";
    document.getElementById("compass").innerHTML = data.current.wind_dir;

    let cartona = ""; 
    for (let i = 0; i < data.forecast.forecastday.length; i++) {
        let days = new Date(data.forecast.forecastday[i].date);
        cartona = `
            <div class="second-day d-flex flex-column align-items-center">
                <span class="text-white heading-2 text-center">${days.toLocaleString('en-us', { weekday: 'long' })}</span>
                <img
                    src="https:${data.forecast.forecastday[i].day.condition.icon}"
                    alt="weather" 
                    class="w-25 mt-4"
                />
                <span class="p-1 mt-2 text-white">${data.forecast.forecastday[i].day.maxtemp_c} <sup>°</sup> C</span>
                <span class="p-1 mt-2 text-white">${data.forecast.forecastday[i].day.mintemp_c}<sup>°</sup>C</span>
                <span class="p-1 mt-2 main_color">${data.forecast.forecastday[i].day.condition.text}</span>
            </div>
        `;
        document.querySelectorAll('.ref')[i].innerHTML = cartona;
    }
}
