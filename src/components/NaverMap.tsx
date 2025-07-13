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

  useEffect(() => {
    // 조건 확인: 스크립트 로드 완료, 데이터 수신, DOM 요소 준비 완료
    if (!isLoaded || treasures.length === 0 || !mapElement.current) {
      return;
    }

    const { naver } = window;
    if (!naver) return;

    // 지도 인스턴스 생성
    const map = new naver.maps.Map(mapElement.current, {
      center: new naver.maps.LatLng(treasures[0].lat, treasures[0].lng),
      zoom: 16,
    });

    // 마커 생성 (원래의 이모지 아이콘 기능 복원)
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

    // 컴포넌트 언마운트 또는 재렌더링 시 지도 인스턴스 파괴 (Cleanup)
    return () => {
      map.destroy();
    };

  }, [isLoaded, treasures]); // 의존성 배열을 isLoaded와 treasures로 명확히 함

  // 로딩/데이터 없음 상태에서는 렌더링하지 않도록 하여 깜빡임 방지
  if (!isLoaded || treasures.length === 0) {
    return <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }} />;
  }
  
  return <div ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};

export default NaverMap; 