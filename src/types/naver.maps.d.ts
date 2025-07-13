// naver.maps.d.ts
interface NaverMap {
  // 사용할 네이버 지도 관련 타입들을 여기에 정의할 수 있습니다.
  // 우선은 간단하게 any로 처리하여 오류를 해결합니다.
  [key: string]: any;
}

interface Window {
  naver: {
    maps: NaverMap;
  };
} 