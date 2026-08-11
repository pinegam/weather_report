/** 기상청 지상 관측 지점 (주요 도시) */
export interface Station {
  id: number
  name: string
  aliases: string[]
}

export const STATIONS: Station[] = [
  { id: 108, name: '서울', aliases: ['서울', '서울특별시', 'seoul'] },
  { id: 112, name: '인천', aliases: ['인천', '인천광역시', 'incheon'] },
  { id: 119, name: '수원', aliases: ['수원', 'suwon'] },
  { id: 101, name: '춘천', aliases: ['춘천', 'chuncheon'] },
  { id: 105, name: '강릉', aliases: ['강릉', 'gangneung'] },
  { id: 90, name: '속초', aliases: ['속초', 'sokcho'] },
  { id: 131, name: '청주', aliases: ['청주', 'cheongju'] },
  { id: 133, name: '대전', aliases: ['대전', '대전광역시', 'daejeon'] },
  { id: 146, name: '전주', aliases: ['전주', 'jeonju'] },
  { id: 156, name: '광주', aliases: ['광주', '광주광역시', 'gwangju'] },
  { id: 165, name: '목포', aliases: ['목포', 'mokpo'] },
  { id: 168, name: '여수', aliases: ['여수', 'yeosu'] },
  { id: 143, name: '대구', aliases: ['대구', '대구광역시', 'daegu'] },
  { id: 136, name: '안동', aliases: ['안동', 'andong'] },
  { id: 138, name: '포항', aliases: ['포항', 'pohang'] },
  { id: 152, name: '울산', aliases: ['울산', '울산광역시', 'ulsan'] },
  { id: 155, name: '창원', aliases: ['창원', 'changwon'] },
  { id: 159, name: '부산', aliases: ['부산', '부산광역시', 'busan'] },
  { id: 184, name: '제주', aliases: ['제주', '제주시', 'jeju'] },
  { id: 189, name: '서귀포', aliases: ['서귀포', 'seogwipo'] },
]

export function findStation(query: string): Station | undefined {
  const normalized = query.trim().toLowerCase()
  return STATIONS.find(
    (s) =>
      s.name === query.trim() ||
      s.aliases.some((alias) => alias.toLowerCase() === normalized),
  )
}
