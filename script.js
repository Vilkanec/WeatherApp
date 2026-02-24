
const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.Card');
const apiKey = "6d95f9b0693d1c5a34277b1160197b93";

weatherForm.addEventListener("submit",async event => {

    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            displayError("An error occurred while fetching the weather data.");
        }
    }
    else{
        displayError("Please enter a city name.");
    }
});

async function getWeatherData(city){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    console.log(response);
    if(!response.ok){
        throw new Error("City not found");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    const {name:city,
           main: {temp, humidity},
           weather: [{description, id}]} = data;
    card.textContent = "";
    card.style.display = "flex";

    card.style.background = GetCardColor(temp, id);

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplauy = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp).toFixed(1)} °C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplauy.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplauy.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplauy);
    card.appendChild(weatherEmoji);

} 

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"; // Thunderstorm
        case (weatherId >= 300 && weatherId < 500):
            return "🌦️"; // Drizzle
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️"; // Rain
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"; // Snow
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️"; // Atmosphere
        case (weatherId === 800):
            return "☀️"; // Clear
        case (weatherId > 800 && weatherId < 810):
            return "☁️"; // Clouds
        default:
            return "🌈"; // Default/Unknown
    }
}
function GetCardColor(temp, id){
const coldColor1 = "#5070ff", coldColor2 = "#00ffeec1"; // Cold - Blue
const warmColor1 = "#ffff8b", warmColor2 = "#ff8000c1"; // Warm - Gold
const thunderstormColor1 = "#4b0082", thunderstormColor2 = "#9400d3"; // Thunderstorm - Indigo to Violet
const drizzleColor1 = "#add8e6", drizzleColor2 = "#87cefa"; // Drizzle - Light Blue to Sky Blue
const rainColor1 = "#1e90ff", rainColor2 = "#00bfff"; // Rain - Dodger Blue to Deep Sky Blue
const snowColor1 = "#ffffff", snowColor2 = "#e0ffff"; // Snow - White to Light Cyan
const atmosphereColor1 = "#d3d3d3", atmosphereColor2 = "#a9a9a9"; // Atmosphere - Light Gray to Dark Gray

let gradientStart;
let gradientEnd;
switch (true) {
    case (id >= 200 && id < 300): // Thunderstorm
        gradientStart = thunderstormColor1;
        gradientEnd = thunderstormColor2;
        break;
    case (id >= 300 && id < 500): // Drizzle
        gradientStart = drizzleColor1;
        gradientEnd = drizzleColor2;
        break;
    case (id >= 500 && id < 600): // Rain
        gradientStart = rainColor1;
        gradientEnd = rainColor2;
        break;
    case (id >= 600 && id < 700): // Snow
        gradientStart = snowColor1;
        gradientEnd = snowColor2;
        break;
    case (id >= 700 && id < 800): // Atmosphere
        gradientStart = atmosphereColor1;
        gradientEnd = atmosphereColor2;
        break;
    case (id === 800): // Clear
        gradientStart = warmColor1;
        gradientEnd = warmColor2;
        break;
    case (id > 800 && id < 810): // Clouds
        gradientStart = coldColor1;
        gradientEnd = coldColor2;
        break;
    default: // Default/Unknown
        gradientStart = warmColor2;
        gradientEnd = warmColor1;


}
return `linear-gradient(180deg, ${gradientStart}, ${gradientEnd})`;
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("ErrorMessage");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
