# Weather App

기상청 API Hub 지상관측 시간자료(`kma_sfctm2`)로 도시별 현재 날씨를 조회해 표시하는 React 프로젝트입니다.

## 구조

```
src/
├── api/                 # API 클라이언트
│   ├── client.ts        # axios 인스턴스
│   └── weather.ts       # 날씨 조회 함수
├── components/
│   ├── SearchBar/       # 도시 검색
│   ├── WeatherCard/     # 날씨 카드 UI
│   └── StatusMessage/   # 로딩 / 에러 메시지
├── constants/           # API URL, 관측 지점
├── hooks/
│   └── useWeather.ts    # 날씨 조회 상태 훅
├── types/
│   └── weather.ts       # 타입 정의
├── utils/
│   ├── format.ts        # 온도/풍속 포맷
│   └── kma.ts           # 기상청 응답 파싱
├── App.tsx
└── main.tsx
```

## 시작하기

1. API 키 설정

```bash
cp .env.example .env
```

`.env`에 [기상청 API Hub](https://apihub.kma.go.kr) 인증키를 넣습니다.

```
VITE_WEATHER_API_KEY=발급받은_키
```

2. 실행

```bash
npm install
npm run dev
```

개발 서버는 `/kma-api` → `https://apihub.kma.go.kr` 프록시를 사용해 CORS를 우회합니다.

## 지원 도시

서울, 부산, 대구, 인천, 광주, 대전, 울산, 수원, 제주 등 주요 관측 지점
(영문명도 가능: Seoul, Busan, …)

## API

- endpoint: `/api/typ01/url/kma_sfctm2.php`
- params: `tm`(관측시각), `stn`(지점번호), `authKey`
