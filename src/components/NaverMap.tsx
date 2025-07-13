"use client";

import { useEffect, useRef } from 'react';
import { Treasure } from '@/context/TreasureContext';

interface NaverMapProps {
  treasures: Treasure[];
}

const NaverMap = ({ treasures }: NaverMapProps) => {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (treasures.length === 0) return;

    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도 중심 위치. 첫 번째 보물의 위치를 중심으로 설정
    const center = new naver.maps.LatLng(treasures[0].lat, treasures[0].lng);
    const map = new naver.maps.Map(mapElement.current, {
      center: center,
      zoom: 16,
    });

    // 모든 보물 위치에 마커 생성
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

  }, [treasures]);

  return <div ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};

export default NaverMap; 