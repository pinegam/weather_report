export const WEATHER_API_BASE_URL =
  import.meta.env.VITE_WEATHER_API_BASE_URL ?? '/kma-api'

export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY ?? ''

/** 지상관측 시간자료 */
export const KMA_SFCTM2_PATH = '/api/typ01/url/kma_sfctm2.php'

export const DEFAULT_CITY = '서울'

export { STATIONS, findStation, findNearestStation } from './stations'
export type { Station } from './stations'
