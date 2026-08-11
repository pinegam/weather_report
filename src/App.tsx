import { SearchBar } from './components/SearchBar/SearchBar'
import { WeatherCard } from './components/WeatherCard/WeatherCard'
import { StatusMessage } from './components/StatusMessage/StatusMessage'
import { useWeather } from './hooks/useWeather'
import './App.css'

function App() {
  const { weather, status, error, search } = useWeather()

  return (
    <div className="app">
      <header className="app__header">
        <h1>Weather</h1>
        <p>기상청 지상관측 자료로 도시 날씨를 조회합니다.</p>
      </header>

      <SearchBar onSearch={search} disabled={status === 'loading'} />

      {status === 'loading' && (
        <StatusMessage type="loading" message="관측 자료를 불러오는 중..." />
      )}

      {status === 'error' && error && (
        <StatusMessage type="error" message={error} />
      )}

      {status === 'success' && weather && <WeatherCard weather={weather} />}
    </div>
  )
}

export default App
