const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const infoTxt = document.querySelector('.errortxt');
const icons = document.querySelector('.icon img');
const middle = document.querySelector('.mid');
locationBtn = document.querySelector("button")

locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess);
    }else{
        alert("Your browser not support geolocation api")
    }

    updatelat()

});
function onSuccess(position){
    // api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${"0d91a78baef4a350cdd9aea4a92bbcc0"}`;
        
    fetchData();
}

const updatelat = async (coordinate) => {
    const position = await getgeo(coordinate);
   return{position};
}


function onError(error){
    infoTxt.innerText = error.message
    infoTxt.classList.add("error");
}
 

const updateUI = (data) => {

    //destructure properties
    const {cityDets, weather} = data; //this is saying to go get the data from the object data and save it to a constant weather , citydets

    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
          <span>${weather.Temperature.Metric.Value}</span>
          <span>&deg;C</span>
        </div>
    `;

    //update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icons.setAttribute('src', iconSrc);
    //Ternary Operator
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg' 
    // let timeSrc = null;
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // } else {
    //     timeSrc = 'img/night.svg';
    // }
    time.setAttribute('src', timeSrc);

    // remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}

const upateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);
    return {cityDets, weather};
    
}



cityForm.addEventListener('submit', e => {
    //prevent default action from refreshing
    e.preventDefault();
    middle.remove();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the UI with the new city
    upateCity(city)
    .then(data => updateUI(data)) // output data to function DOM
    .catch(err => {
        alert(`${city} isn't a valid city name`);
        location.reload();
    });
    
})

