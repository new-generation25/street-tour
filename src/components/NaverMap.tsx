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

    const center = new naver.maps.LatLng(treasures[0].lat, treasures[0].lng);
    const map = new naver.maps.Map(mapElement.current, {
      center: center,
      zoom: 16,
    });

    treasures.forEach(treasure => {
      new naver.maps.Marker({
        position: new naver.maps.LatLng(treasure.lat, treasure.lng),
        map: map,
        // icon 속성을 제거하여 기본 마커를 사용하도록 함
      });
    });

  }, [treasures, isLoaded]);

  // 지도와 상태를 명확히 분리하여 렌더링
  if (!isLoaded || treasures.length === 0) {
    // 로딩 중이거나 데이터가 없을 때는 빈 컨테이너만 렌더링
    return <div style={{ width: '100%', height: '100%' }} />;
  }

  return <div ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};

export default NaverMap; 