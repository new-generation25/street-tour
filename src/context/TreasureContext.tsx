"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// 보물 하나하나의 모양 정의
export interface Treasure {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  found: boolean;
}

// 전역으로 관리할 데이터와 함수의 모양 정의
export interface TreasureContextType {
  treasures: Treasure[];
  findTreasure: (id: number) => void;
  toggleTreasure: (id: number) => void; // 테스트용 토글 함수
  bingoCount: number;
  isClient: boolean;
  testMode: boolean; // 테스트 모드 상태
  setTestMode: (mode: boolean) => void; // 테스트 모드 변경 함수
}

// 초기 보물 데이터
const initialTreasures: Treasure[] = [
    { id: 1, name: '카페 봉황1935', subtitle: '1935년', description: '일제강점기 적산가옥을 리모델링한 다국적 향취의 카페', icon: '🏛️', found: true },
    { id: 2, name: '미야상회', subtitle: '전통', description: '어릴 적 동네에 있던 작은 상점의 정취를 간직한 곳', icon: '🏪', found: true },
    { id: 3, name: '탱자카페', subtitle: '1930년', description: '해반천 모래로 만든 기와의 1930년 고옥 카페', icon: '🌿', found: true },
    { id: 4, name: '가야대장간', subtitle: '2대째', description: '2대째 가업으로 전통 대장간의 명맥을 잇는 곳', icon: '🔨', found: false },
    { id: 5, name: '기와조각', subtitle: '신라시대', description: '오래된 가옥에서 발견된 신라시대 기와 한 조각', icon: '🧱', found: false },
    { id: 6, name: '고문서', subtitle: '조선시대', description: '조선시대의 생활상이 기록된 낡은 고문서', icon: '📜', found: false },
    { id: 7, name: '벚꽃잎', subtitle: '봄의 전령', description: '봉황대길에 흩날리던 아름다운 봄의 증표', icon: '🌸', found: false },
    { id: 8, name: '풍경소리', subtitle: '마음의 평화', description: '처마 밑에서 울려퍼지는 맑고 청아한 소리', icon: '🔔', found: false },
    { id: 9, name: '금단지', subtitle: '가야의 유물', description: '가야시대의 화려한 문화를 보여주는 금 장식', icon: '🏺', found: false },
    { id: 10, name: '탈', subtitle: '전통 놀이', description: '마을의 안녕을 기원하던 전통 탈춤에 사용된 탈', icon: '🎭', found: false },
    { id: 11, name: '달빛조각', subtitle: '밤의 선물', description: '월정교 아래 강물에 비친 달의 반짝이는 조각', icon: '🌙', found: false },
    { id: 12, name: '별가루', subtitle: '하늘의 축복', description: '첨성대에서 바라본 밤하늘의 반짝이는 별가루', icon: '✨', found: false },
    { id: 13, name: '봉황깃털', subtitle: '전설의 새', description: '봉황이 남기고 갔다는 전설 속 오색찬란한 깃털', icon: '🪶', found: false },
    { id: 14, name: '수로왕인장', subtitle: '가야의 건국', description: '가야를 건국한 수로왕의 위엄을 상징하는 인장', icon: '👑', found: false },
    { id: 15, name: '옥구슬', subtitle: '왕의 장신구', description: '왕족만이 가질 수 있었던 귀한 푸른 옥구슬', icon: '🟢', found: false },
    { id: 16, name: '황금열쇠', subtitle: '미로의 끝', description: '미로의 모든 비밀을 풀 수 있는 마지막 열쇠', icon: '🔑', found: false },
];

// Context 생성 (처음엔 비어있음)
const TreasureContext = createContext<TreasureContextType | undefined>(undefined);

// 다른 컴포넌트에서 쉽게 Context를 사용하게 해주는 도우미 함수(Hook)
export const useTreasures = () => {
  const context = useContext(TreasureContext);
  if (!context) {
    throw new Error('useTreasures must be used within a TreasureProvider');
  }
  return context;
};

// 앱 전체에 데이터를 공급해주는 부모 컴포넌트
export const TreasureProvider = ({ children }: { children: ReactNode }) => {
  const [treasures, setTreasures] = useState<Treasure[]>(initialTreasures);
  const [bingoCount, setBingoCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [testMode, setTestMode] = useState(false); // 테스트 모드 상태 추가

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const count = treasures.filter(t => t.found).length;
    setBingoCount(count);
  }, [treasures, isClient]);

  const findTreasure = (id: number) => {
    setTreasures(prevTreasures =>
      prevTreasures.map(t => (t.id === id ? { ...t, found: true } : t))
    );
  };

  // 테스트 모드에서 보물 상태를 직접 토글하는 함수
  const toggleTreasure = (id: number) => {
    setTreasures(prevTreasures =>
      prevTreasures.map(t => (t.id === id ? { ...t, found: !t.found } : t))
    );
  };

  return (
    <TreasureContext.Provider value={{ treasures, findTreasure, toggleTreasure, bingoCount, isClient, testMode, setTestMode }}>
      {children}
    </TreasureContext.Provider>
  );
}; 