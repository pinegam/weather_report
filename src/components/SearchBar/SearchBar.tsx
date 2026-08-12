import { useState, type FormEvent } from 'react'
import './SearchBar.css'

interface SearchBarProps {
  onSearch: (city: string) => void
  onLocate: () => void
  disabled?: boolean
}

export function SearchBar({ onSearch, onLocate, disabled }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    onSearch(query.trim())
  }

  return (
    <div className="search-bar">
      <form className="search-bar__form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="도시명 입력 (예: 서울, 부산, Seoul)"
          disabled={disabled}
          aria-label="도시 검색"
        />
        <button type="submit" disabled={disabled || !query.trim()}>
          검색
        </button>
      </form>
      <button
        type="button"
        className="search-bar__locate"
        onClick={onLocate}
        disabled={disabled}
        aria-label="내 위치로 날씨 조회"
      >
        내 위치
      </button>
    </div>
  )
}
