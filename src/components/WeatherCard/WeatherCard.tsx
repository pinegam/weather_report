import type { WeatherData } from '../../types/weather'
import {
  formatCloud,
  formatRainfall,
  formatTemp,
  formatUpdatedAt,
  formatWind,
} from '../../utils/format'
import './WeatherCard.css'

interface WeatherCardProps {
  weather: WeatherData
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <article className="weather-card">
      <header className="weather-card__header">
        <h2>
          {weather.city}{' '}
          <span className="weather-card__stn">#{weather.stationId}</span>
        </h2>
        <p className="weather-card__updated">
          관측 {formatUpdatedAt(weather.updatedAt)}
        </p>
      </header>

      <div className="weather-card__main">
        <div>
          <p className="weather-card__temp">{formatTemp(weather.temp)}</p>
          <p className="weather-card__desc">{weather.description}</p>
        </div>
      </div>

      <dl className="weather-card__details">
        <div>
          <dt>습도</dt>
          <dd>{weather.humidity}%</dd>
        </div>
        <div>
          <dt>풍속</dt>
          <dd>{formatWind(weather.windSpeed, weather.windDir)}</dd>
        </div>
        <div>
          <dt>기압</dt>
          <dd>{weather.pressure ? `${weather.pressure} hPa` : '-'}</dd>
        </div>
        <div>
          <dt>이슬점</dt>
          <dd>
            {weather.dewPoint != null ? formatTemp(weather.dewPoint) : '-'}
          </dd>
        </div>
        <div>
          <dt>강수</dt>
          <dd>{formatRainfall(weather.rainfall)}</dd>
        </div>
        <div>
          <dt>전운량</dt>
          <dd>{formatCloud(weather.cloudCover)}</dd>
        </div>
      </dl>
    </article>
  )
}
