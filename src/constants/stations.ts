/** 기상청 지상 관측 지점 (주요 도시) */
export interface Station {
  id: number
  name: string
  aliases: string[]
  lat: number
  lon: number
}

export const STATIONS: Station[] = [
  { id: 108, name: '서울', aliases: ['서울', '서울특별시', 'seoul'], lat: 37.5714, lon: 126.9658 },
  { id: 112, name: '인천', aliases: ['인천', '인천광역시', 'incheon'], lat: 37.4776, lon: 126.6249 },
  { id: 119, name: '수원', aliases: ['수원', 'suwon'], lat: 37.2723, lon: 126.9853 },
  { id: 101, name: '춘천', aliases: ['춘천', 'chuncheon'], lat: 37.9026, lon: 127.7357 },
  { id: 105, name: '강릉', aliases: ['강릉', 'gangneung'], lat: 37.7515, lon: 128.891 },
  { id: 90, name: '속초', aliases: ['속초', 'sokcho'], lat: 38.2509, lon: 128.5647 },
  { id: 131, name: '청주', aliases: ['청주', 'cheongju'], lat: 36.6392, lon: 127.4407 },
  { id: 133, name: '대전', aliases: ['대전', '대전광역시', 'daejeon'], lat: 36.372, lon: 127.3721 },
  { id: 146, name: '전주', aliases: ['전주', 'jeonju'], lat: 35.8215, lon: 127.1549 },
  { id: 156, name: '광주', aliases: ['광주', '광주광역시', 'gwangju'], lat: 35.1729, lon: 126.8916 },
  { id: 165, name: '목포', aliases: ['목포', 'mokpo'], lat: 34.8174, lon: 126.3812 },
  { id: 168, name: '여수', aliases: ['여수', 'yeosu'], lat: 34.7393, lon: 127.7406 },
  { id: 143, name: '대구', aliases: ['대구', '대구광역시', 'daegu'], lat: 35.8779, lon: 128.6522 },
  { id: 136, name: '안동', aliases: ['안동', 'andong'], lat: 36.5729, lon: 128.7073 },
  { id: 138, name: '포항', aliases: ['포항', 'pohang'], lat: 36.032, lon: 129.38 },
  { id: 152, name: '울산', aliases: ['울산', '울산광역시', 'ulsan'], lat: 35.56, lon: 129.32 },
  { id: 155, name: '창원', aliases: ['창원', 'changwon'], lat: 35.1702, lon: 128.5728 },
  { id: 159, name: '부산', aliases: ['부산', '부산광역시', 'busan'], lat: 35.1047, lon: 129.032 },
  { id: 184, name: '제주', aliases: ['제주', '제주시', 'jeju'], lat: 33.5141, lon: 126.5297 },
  { id: 189, name: '서귀포', aliases: ['서귀포', 'seogwipo'], lat: 33.2461, lon: 126.5653 },
]

export function findStation(query: string): Station | undefined {
  const normalized = query.trim().toLowerCase()
  return STATIONS.find(
    (s) =>
      s.name === query.trim() ||
      s.aliases.some((alias) => alias.toLowerCase() === normalized),
  )
}

/** 위·경도에서 가장 가까운 관측 지점 */
export function findNearestStation(lat: number, lon: number): Station {
  let nearest = STATIONS[0]
  let minDistance = Number.POSITIVE_INFINITY

  for (const station of STATIONS) {
    const d = haversineKm(lat, lon, station.lat, station.lon)
    if (d < minDistance) {
      minDistance = d
      nearest = station
    }
  }

  return nearest
}

function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}
