import axios from 'axios'
import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from '../constants'

export const weatherClient = axios.create({
  baseURL: WEATHER_API_BASE_URL,
  timeout: 15_000,
  responseType: 'text',
  params: {
    authKey: WEATHER_API_KEY,
  },
})
