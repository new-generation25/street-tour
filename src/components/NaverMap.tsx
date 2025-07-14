"use client";

import { useEffect, useRef, useState } from 'react';
import { Treasure } from '@/context/TreasureContext';
import { useScriptLoad } from '@/context/ScriptLoadContext';

interface NaverMapProps {
  treasures: Treasure[];
  onMarkerClick?: (treasureId: number) => void;
}

const NaverMap = ({ treasures, onMarkerClick }: NaverMapProps) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const { isLoaded } = useScriptLoad();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // 사용자 위치 가져오기
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("위치 정보를 가져올 수 없습니다:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    }
  }, []);

  // 지도 초기화 및 렌더링
  useEffect(() => {
    // 조건 확인: 스크립트 로드 완료, 데이터 수신, DOM 요소 준비 완료
    if (!isLoaded || treasures.length === 0 || !mapElement.current) {
      return;
    }

    const { naver } = window;
    if (!naver) return;

    // 기존 지도 인스턴스가 있다면 제거
    if (mapInstance.current) {
      mapInstance.current.destroy();
    }

    // 지도 인스턴스 생성
    const map = new naver.maps.Map(mapElement.current, {
      center: new naver.maps.LatLng(treasures[0].lat, treasures[0].lng),
      zoom: 16,
    });

    mapInstance.current = map;

    // 마커 생성 및 클릭 이벤트 추가
    treasures.forEach(treasure => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(treasure.lat, treasure.lng),
        map: map,
        icon: {
          content: `<div style="font-size: 24px; cursor: pointer;">${treasure.icon}</div>`,
          anchor: new naver.maps.Point(12, 12),
        },
      });

      // 마커 클릭 이벤트 추가
      naver.maps.Event.addListener(marker, 'click', () => {
        if (onMarkerClick) {
          onMarkerClick(treasure.id);
        }
      });
    });

    // 사용자 현재 위치 마커 추가
    if (userLocation) {
      const userMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(userLocation.lat, userLocation.lng),
        map: map,
        icon: {
          content: `
            <div style="
              width: 16px;
              height: 16px;
              background-color: #2563eb;
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              cursor: pointer;
            "></div>
          `,
          anchor: new naver.maps.Point(8, 8),
        },
      });

      // 사용자 위치 마커 클릭 시 해당 위치로 지도 중심 이동
      naver.maps.Event.addListener(userMarker, 'click', () => {
        map.setCenter(new naver.maps.LatLng(userLocation.lat, userLocation.lng));
      });
    }

    // 지도 리사이즈 이벤트 처리 (탭 전환 시 필요)
    setTimeout(() => {
      naver.maps.Event.trigger(map, 'resize');
    }, 100);

    // 컴포넌트 언마운트 시 지도 인스턴스 파괴 (Cleanup)
    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };

  }, [isLoaded, treasures, userLocation]); // userLocation도 의존성에 추가

  // 컴포넌트가 다시 보여질 때 지도 리사이즈
  useEffect(() => {
    const handleResize = () => {
      if (mapInstance.current && window.naver) {
        setTimeout(() => {
          window.naver.maps.Event.trigger(mapInstance.current, 'resize');
        }, 100);
      }
    };

    // ResizeObserver를 사용하여 컨테이너 크기 변화 감지
    if (mapElement.current) {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(mapElement.current);
      
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  // 로딩/데이터 없음 상태에서는 렌더링하지 않도록 하여 깜빡임 방지
  if (!isLoaded || treasures.length === 0) {
    return <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }} />;
  }
  
  return <div ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};

export default NaverMap; 