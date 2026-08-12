import { useCallback, useEffect, useState } from 'react'
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
} from '../api/weather'
import { DEFAULT_CITY } from '../constants'
import type { WeatherData, WeatherStatus } from '../types/weather'
import { getCurrentPosition } from '../utils/geo'
import axios from 'axios'

interface UseWeatherResult {
  weather: WeatherData | null
  status: WeatherStatus
  error: string | null
  search: (city: string) => Promise<void>
  searchByLocation: () => Promise<void>
}

function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 401 || err.response?.status === 403) {
      return 'API 키가 유효하지 않습니다.'
    }
    if (!err.response) return '네트워크 오류가 발생했습니다.'
  }
  if (err instanceof Error) return err.message
  return '날씨 정보를 불러오지 못했습니다.'
}

export function useWeather(initialCity = DEFAULT_CITY): UseWeatherResult {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [status, setStatus] = useState<WeatherStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const run = useCallback(async (loader: () => Promise<WeatherData>) => {
    setStatus('loading')
    setError(null)

    try {
      const data = await loader()
      setWeather(data)
      setStatus('success')
    } catch (err) {
      setWeather(null)
      setError(getErrorMessage(err))
      setStatus('error')
    }
  }, [])

  const search = useCallback(
    async (city: string) => {
      await run(() => fetchWeatherByCity(city))
    },
    [run],
  )

  const searchByLocation = useCallback(async () => {
    await run(async () => {
      const { lat, lon } = await getCurrentPosition()
      return fetchWeatherByCoords(lat, lon)
    })
  }, [run])

  useEffect(() => {
    void search(initialCity)
  }, [initialCity, search])

  return { weather, status, error, search, searchByLocation }
}
