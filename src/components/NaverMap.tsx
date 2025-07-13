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
    if (!isLoaded || treasures.length === 0 || !mapElement.current) {
      return;
    }

    const { naver } = window;
    if (!naver) return;

    // 지도 인스턴스를 변수에 저장하여 cleanup에서 참조할 수 있도록 함
    const map = new naver.maps.Map(mapElement.current, {
      center: new naver.maps.LatLng(treasures[0].lat, treasures[0].lng),
      zoom: 16,
    });

    treasures.forEach(treasure => {
      new naver.maps.Marker({
        position: new naver.maps.LatLng(treasure.lat, treasure.lng),
        map: map,
      });
    });

    // ✨ 중요: Cleanup 함수
    // 이 useEffect가 다시 실행되거나 컴포넌트가 사라지기 전에 실행됨
    return () => {
      map.destroy(); // 생성된 지도 인스턴스를 깨끗하게 파괴
    };

  }, [treasures, isLoaded]);

  // 로딩 중이거나 데이터가 없을 때 빈 컨테이너만 렌더링
  if (!isLoaded || treasures.length === 0) {
    return <div style={{ width: '100%', height: '100%' }} />;
  }

  return <div ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};

export default NaverMap; 