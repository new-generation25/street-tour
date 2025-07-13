"use client";

import { useEffect, useRef } from 'react';
import { Treasure } from '@/context/TreasureContext';
import { useScriptLoad } from '@/context/ScriptLoadContext';

interface NaverMapProps {
  treasures: Treasure[];
}

const NaverMap = ({ treasures }: NaverMapProps) => {
  // 1. 모든 React 훅을 컴포넌트 최상단에서 호출 (규칙 준수)
  const mapElement = useRef<HTMLDivElement>(null);
  const { isLoaded } = useScriptLoad();

  useEffect(() => {
    // 2. 조건 확인은 useEffect 내부에서 수행
    if (!isLoaded || treasures.length === 0 || !mapElement.current) {
      return; // 조건이 맞지 않으면 아무것도 하지 않음
    }

    const { naver } = window;
    if (!naver) return;

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

  // 3. 훅 호출이 모두 끝난 후에 조건부 렌더링 수행
  if (!isLoaded) {
    return <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
      디버그: 스크립트 로딩 중...
    </div>;
  }

  if (treasures.length === 0) {
    return <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
      디버그: 데이터 로딩 중... (보물 개수: 0)
    </div>;
  }

  return <div ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};

export default NaverMap; 