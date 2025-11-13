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
  lat: number;
  lng: number;
  quiz: {
    image: string;
    question: string;
    answer: string;
  };
}

// 전역으로 관리할 데이터와 함수의 모양 정의
export interface TreasureContextType {
  treasures: Treasure[];
  findTreasure: (id: number) => void;
  toggleTreasure: (id: number) => void;
  bingoCount: number;
  isClient: boolean;
  testMode: boolean;
  setTestMode: (mode: boolean) => void;
}

// 초기 보물 데이터 - 봉황 메모리즈: 아버지의 타임캡슐
const initialTreasuresData: Treasure[] = [
  {
    id: 1,
    name: '봉황 1935',
    subtitle: '미션 1',
    description: '엄마와의 러브스토리 - 풍선초 씨앗으로 하트 키링 만들기',
    icon: '💕',
    found: false,
    lat: 35.228503, lng: 128.876850,
    quiz: {
      image: '/bonghwang1935.png',
      question: '풍선초의 씨앗 모양은 무엇일까요? (힌트: 사랑을 상징하는 모양)',
      answer: '하트'
    }
  },
  {
    id: 2,
    name: '미야상회',
    subtitle: '미션 2',
    description: '바나나우유의 약속 - 목욕탕 다녀온 후 아버지가 사오던 음식 찾기',
    icon: '🥛',
    found: false,
    lat: 35.229124, lng: 128.878581,
    quiz: {
      image: '/miyastore.png',
      question: '아버지가 매주 일요일마다 목욕탕 다녀온 후 미야상회에서 사오던 음식은? (힌트: 채연의 나나나 춤, CM송)',
      answer: '바나나우유'
    }
  },
  {
    id: 3,
    name: '능소화 고택',
    subtitle: '미션 3',
    description: '능소화 사진 - 아버지가 제일 좋아하던 꽃 앞에서 예쁜 사진 찍기',
    icon: '📸',
    found: false,
    lat: 35.229500, lng: 128.879000, // 능소화 고택 추정 좌표
    quiz: {
      image: '/taengja.png',
      question: '능소화는 언제 피는 꽃일까요? (힌트: 여름에 피었다 지는 꽃, 지금은 꽃이 없지만 예전엔 동네에 많았어요)',
      answer: '여름'
    }
  },
  {
    id: 4,
    name: '카페 탱자',
    subtitle: '미션 4',
    description: '아버지의 플레이리스트 - 아버지가 좋아하던 음악 듣고 편지 쓰기',
    icon: '🎵',
    found: false,
    lat: 35.229360, lng: 128.879832,
    quiz: {
      image: '/taengja.png',
      question: '아버지(강민수)가 소영을 생각하며 신청한 노래는? (힌트: 이문세의 노래, "내 곁에만 머물러요 떠나면 안 돼요", 소녀로 남아주길 바랐던 아버지의 마음)',
      answer: '소녀'
    }
  },
  {
    id: 5,
    name: '방하림',
    subtitle: '미션 5',
    description: '가족오락관 - 아버지가 한 달 전부터 준비한 마지막 소원, 가족과 함께 게임하기',
    icon: '🎮',
    found: false,
    lat: 35.230000, lng: 128.880000, // 방하림 추정 좌표
    quiz: {
      image: '',
      question: 'ㅂㅎㅁㅁㄹㅈ 이 자음으로 된 단어는? 오늘 여러분들이 참여한 프로그램의 이름입니다. (힌트: 봉황동의 추억)',
      answer: '봉황메모리즈'
    }
  },
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
  const [treasures, setTreasures] = useState<Treasure[]>(initialTreasuresData);
  const [bingoCount, setBingoCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [testMode, setTestMode] = useState(false);

  useEffect(() => {
    // 컴포넌트가 클라이언트에 마운트된 후, localStorage에서 데이터를 불러와 상태를 업데이트합니다.
    // 이 방식은 서버 사이드 렌더링과의 충돌을 원천적으로 방지합니다.
    try {
      const savedTreasures = localStorage.getItem('treasures');
      if (savedTreasures && savedTreasures !== 'undefined') {
        const parsedTreasures = JSON.parse(savedTreasures);
        setTreasures(parsedTreasures);
      }
    } catch (e) {
      console.error("Failed to load treasures from localStorage, using initial data.", e);
      localStorage.removeItem('treasures'); // 손상된 데이터 삭제
    }

    setIsClient(true);
  }, []); // 빈 배열은 이 useEffect가 컴포넌트 마운트 시 딱 한 번만 실행됨을 의미합니다.


  useEffect(() => {
    // isClient가 true일 때만 (즉, 초기 로딩이 끝난 후) localStorage에 저장합니다.
    // 이는 초기화 시점에 초기 데이터가 저장되어 기존 데이터를 덮어쓰는 것을 방지합니다.
    if (isClient) {
      localStorage.setItem('treasures', JSON.stringify(treasures));
    }
  }, [treasures, isClient]);


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