export interface GeoPosition {
  lat: number
  lon: number
}

export function getCurrentPosition(): Promise<GeoPosition> {
  if (!navigator.geolocation) {
    return Promise.reject(new Error('이 브라우저에서는 위치 정보를 사용할 수 없습니다.'))
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        })
      },
      (err) => {
        reject(new Error(geolocationErrorMessage(err)))
      },
      {
        enableHighAccuracy: false,
        timeout: 10_000,
        maximumAge: 60_000,
      },
    )
  })
}

function geolocationErrorMessage(err: GeolocationPositionError): string {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      return '위치 권한이 거부되었습니다. 브라우저 설정에서 허용해 주세요.'
    case err.POSITION_UNAVAILABLE:
      return '현재 위치를 확인할 수 없습니다.'
    case err.TIMEOUT:
      return '위치 확인 시간이 초과되었습니다.'
    default:
      return '위치 정보를 가져오지 못했습니다.'
  }
}
