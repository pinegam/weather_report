import { useState, type FormEvent } from 'react'
import './SearchBar.css'

interface SearchBarProps {
  onSearch: (city: string) => void
  disabled?: boolean
}

export function SearchBar({ onSearch, disabled }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    onSearch(query.trim())
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
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
  )
}
