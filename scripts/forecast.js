const key ='g8S9cC7ZARBO6jJMBWcPIdssc0rAtCai';

//get weather information 
const getWeather = async (id) => {
    const base ='http://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
}

//get city information
const getCity = async (city) => { // to return a promise
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city} `

    const response = await fetch(base + query);
    const data = await response.json(); // turning it into data

    return (data[0]);

};

// getCity('london').then(data => {
//     return getWeather(data.Key); // to get the current condition
// }).then(data => {
//     console.log(data)
// })
// .catch(err => console.log(err));

// getWeather("328328"
// )