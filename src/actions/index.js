import axios from 'axios';

const API_KEY = 'eb5b4008d312464d2daa8aab1333ce6c';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;


export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city},us`;
    const request = axios.get(url);

    //console.log('Request', request);

    return {
        type: FETCH_WEATHER,
        payload: request
    };

}