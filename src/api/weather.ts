import { weatherClient } from './client'
import {
  KMA_SFCTM2_PATH,
  findStation,
  type Station,
} from '../constants'
import type { WeatherData } from '../types/weather'
import {
  describeObservation,
  getLatestObservationTm,
  parseKmaSfctm2,
  tmToUnixSeconds,
} from '../utils/kma'

function toWeatherData(station: Station, text: string): WeatherData {
  const rows = parseKmaSfctm2(text)
  const obs = rows.find((r) => r.stn === station.id) ?? rows[0]

  if (!obs || obs.temp == null) {
    throw new Error('해당 지점의 관측 자료가 없습니다.')
  }

  return {
    city: station.name,
    stationId: station.id,
    description: describeObservation(obs),
    temp: obs.temp,
    dewPoint: obs.dewPoint,
    humidity: obs.humidity ?? 0,
    pressure: obs.pressure ?? 0,
    windSpeed: obs.windSpeed ?? 0,
    windDir: obs.windDir,
    rainfall: obs.rainfall,
    rainfallDay: obs.rainfallDay,
    cloudCover: obs.cloudCover,
    updatedAt: tmToUnixSeconds(obs.tm),
  }
}

/** 도시명(또는 지점명)으로 현재 관측 조회 */
export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  if (!city.trim()) {
    throw new Error('도시명을 입력해 주세요.')
  }

  const station = findStation(city)
  if (!station) {
    throw new Error(
      '지원하지 않는 도시입니다. 예: 서울, 부산, 대구, 인천, 광주, 대전, 제주',
    )
  }

  if (!import.meta.env.VITE_WEATHER_API_KEY) {
    throw new Error('API 키가 설정되지 않았습니다. .env를 확인해 주세요.')
  }

  const tm = getLatestObservationTm()
  const { data } = await weatherClient.get<string>(KMA_SFCTM2_PATH, {
    params: {
      tm,
      stn: station.id,
      help: 0,
    },
  })

  return toWeatherData(station, data)
}
