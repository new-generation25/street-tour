"use client";

import { useEffect, useRef } from 'react';
import { Treasure } from '@/context/TreasureContext';
import { useScriptLoad } from '@/context/ScriptLoadContext';

interface NaverMapProps {
  treasures: Treasure[];
}

const NaverMap = ({ treasures }: NaverMapProps) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const { isLoaded } = useScriptLoad();

  // 1. 스크립트 로드 상태 확인
  if (!isLoaded) {
    return <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
      디버그: 스크립트 로딩 중...
    </div>;
  }

  // 2. 데이터 수신 상태 확인
  if (treasures.length === 0) {
    return <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
      디버그: 데이터 로딩 중... (보물 개수: 0)
    </div>;
  }

  // 3. 모든 조건 충족 시 지도 렌더링 시도
  useEffect(() => {
    // 이 부분은 그대로 유지
    if (!isLoaded || treasures.length === 0) return;

    const { naver } = window;
    if (!mapElement.current || !naver) return;

    const center = new naver.maps.LatLng(treasures[0].lat, treasures[0].lng);
    const map = new naver.maps.Map(mapElement.current, {
      center: center,
      zoom: 16,
    });

    treasures.forEach(treasure => {
      new naver.maps.Marker({
        position: new naver.maps.LatLng(treasure.lat, treasure.lng),
        map: map,
        icon: {
          content: `<div style="font-size: 24px;">${treasure.icon}</div>`,
          anchor: new naver.maps.Point(12, 12),
        },
      });
    });

  }, [treasures, isLoaded]);

  // 모든 조건이 통과했을 때만 이 div가 렌더링됨
  return <div ref={mapElement} style={{ width: '100%', height: '100%' }}>
    {/* 화면에 보이지 않지만, 이 div가 있다는 것은 모든 조건이 통과했다는 의미 */}
  </div>;
};

export default NaverMap; 