const fetch = require('isomorphic-unfetch')
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather'
const apiKey = '166d00e26d3ff2c6149e89feccc5c59a'
import wind_dir from './wind_direction'


async function getWeather(city, country = 'dk') {

    const url = `${baseUrl}?q=${city},${country}&appid=${apiKey}&units=metric`
    const result = await fetch(url)
    const data = await result.json()
    const dir = wind_dir.getWindDirection(data.wind.deg)

    return {
        city: city,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        wind: dir,
        wind_deg: data.wind.deg
    }
}


const weatherData = {getWeather}
export default weatherData