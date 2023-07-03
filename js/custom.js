
// Selector
const form = document.querySelector('form');
const searchValue = document.querySelector('#searchCity');
const element = document.querySelector('#display');
const message = document.querySelector('.message');

// Search Form
form.addEventListener('submit', function(event){
    element.classList.remove("d-none");
    event.preventDefault();    
    getWeather(searchValue.value);
    
});

// Get API Data
const getWeather = async(city) => {
    const apiKey 	= "19259d9f317d59a55099f44d56d55015"
    const url 	    = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const weatherData = await fetch(`${url}`).then(
        response => response.json()
    );
    return showWeatherData( weatherData );
}
  
// Display Data 
const showWeatherData = (data) => {

    if( data.cod == "404" ){
        element.classList.add("d-none");
        message.innerHTML = data.message.toUpperCase();
        return;
    }

    const iconCode = data.weather[0].icon;
    const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";  

    document.querySelector('#cityName').innerHTML   = data.name;
    document.querySelector('.small').innerHTML      = data.weather[0].description;
    document.querySelector('#temp').innerHTML       = Math.round(data.main.temp) + '°C';
    document.querySelector('#speed').innerHTML      = data.wind.speed + 'km/h';
    document.querySelector('#humidity').innerHTML   = data.main.humidity + '%';
    document.querySelector('#icon').src             = iconUrl;
}