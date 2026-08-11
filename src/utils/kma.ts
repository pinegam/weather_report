import type { KmaObservation } from '../types/weather'

/** 결측 코드 (-9, -99, -999 등) → null */
export function parseKmaNumber(raw: string | undefined): number | null {
  if (raw == null || raw === '' || raw === '-') return null
  const n = Number(raw)
  if (Number.isNaN(n)) return null
  if (n === -9 || n === -99 || n === -999) return null
  return n
}

/**
 * KST 기준 최근 정시 관측시각 (YYYYMMDDHHMM)
 * 매시 초반에는 직전 시각을 사용
 */
export function getLatestObservationTm(date = new Date()): string {
  const kstOffsetMs = 9 * 60 * 60 * 1000
  let kstMs = date.getTime() + kstOffsetMs

  const provisional = new Date(kstMs)
  if (provisional.getUTCMinutes() < 20) {
    kstMs -= 60 * 60 * 1000
  }

  const kst = new Date(kstMs)
  const y = kst.getUTCFullYear()
  const m = String(kst.getUTCMonth() + 1).padStart(2, '0')
  const d = String(kst.getUTCDate()).padStart(2, '0')
  const h = String(kst.getUTCHours()).padStart(2, '0')
  return `${y}${m}${d}${h}00`
}

/** YYMMDDHHMI → unix seconds (KST) */
export function tmToUnixSeconds(tm: string): number {
  const y = Number(tm.slice(0, 4))
  const mo = Number(tm.slice(4, 6)) - 1
  const d = Number(tm.slice(6, 8))
  const h = Number(tm.slice(8, 10))
  const mi = Number(tm.slice(10, 12) || '0')
  // Date.UTC 후 KST(+9) 보정
  return Date.UTC(y, mo, d, h, mi) / 1000 - 9 * 60 * 60
}

/** 고정폭/공백 구분 텍스트 응답에서 관측 행 파싱 */
export function parseKmaSfctm2(text: string): KmaObservation[] {
  const lines = text.split(/\r?\n/)
  const rows: KmaObservation[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('#START') || trimmed.startsWith('#7777')) {
      continue
    }
    // #START7777 / #7777END 등
    if (!/^\d{10,12}\s+\d+/.test(trimmed)) continue

    const cols = trimmed.split(/\s+/)
    if (cols.length < 14) continue

    rows.push({
      tm: cols[0],
      stn: Number(cols[1]),
      windDir: parseKmaNumber(cols[2]),
      windSpeed: parseKmaNumber(cols[3]),
      pressure: parseKmaNumber(cols[8]) ?? parseKmaNumber(cols[7]),
      temp: parseKmaNumber(cols[11]),
      dewPoint: parseKmaNumber(cols[12]),
      humidity: parseKmaNumber(cols[13]),
      rainfall: parseKmaNumber(cols[15]),
      rainfallDay: parseKmaNumber(cols[16]),
      cloudCover: parseKmaNumber(cols[25]),
      weatherCode: cols[24] && cols[24] !== '-' ? cols[24] : null,
    })
  }

  return rows
}

/** 관측값으로 짧은 날씨 설명 생성 */
export function describeObservation(obs: KmaObservation): string {
  const rain = obs.rainfall
  const cloud = obs.cloudCover
  const temp = obs.temp

  if (rain != null && rain > 0) {
    if (rain >= 10) return '강한 비'
    if (rain >= 3) return '비'
    return '약한 비'
  }
  if (cloud != null) {
    if (cloud >= 8) return '흐림'
    if (cloud >= 3) return '구름 많음'
    return '맑음'
  }
  if (temp != null) {
    if (temp <= 0) return '추움'
    if (temp >= 28) return '더움'
  }
  return '관측 자료'
}
