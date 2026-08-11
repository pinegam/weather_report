const WIND_DIRS = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
]

export function formatTemp(temp: number): string {
  return `${Math.round(temp)}°C`
}

export function formatWind(speed: number, dir: number | null = null): string {
  const speedText = `${speed.toFixed(1)} m/s`
  if (dir == null || dir === 0) return speedText
  // 기상청 36방위 → 16방위 라벨
  const idx = Math.round(dir / 2.25) % 16
  return `${WIND_DIRS[idx]} ${speedText}`
}

export function formatUpdatedAt(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toLocaleString('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatRainfall(mm: number | null): string {
  if (mm == null) return '-'
  return `${mm.toFixed(1)} mm`
}

export function formatCloud(cover: number | null): string {
  if (cover == null) return '-'
  return `${cover}/10`
}
