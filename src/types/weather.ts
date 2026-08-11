/** 기상청 지상관측 파싱 결과 */
export interface KmaObservation {
  tm: string
  stn: number
  windDir: number | null
  windSpeed: number | null
  pressure: number | null
  temp: number | null
  dewPoint: number | null
  humidity: number | null
  rainfall: number | null
  rainfallDay: number | null
  cloudCover: number | null
  weatherCode: string | null
}

/** 화면에서 쓰는 가공된 날씨 데이터 */
export interface WeatherData {
  city: string
  stationId: number
  description: string
  temp: number
  dewPoint: number | null
  humidity: number
  pressure: number
  windSpeed: number
  windDir: number | null
  rainfall: number | null
  rainfallDay: number | null
  cloudCover: number | null
  updatedAt: number
}

export type WeatherStatus = 'idle' | 'loading' | 'success' | 'error'
