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
  toggleTreasure: (id: number) => void; // 테스트용 토글 함수
  bingoCount: number;
  isClient: boolean;
  testMode: boolean; // 테스트 모드 상태
  setTestMode: (mode: boolean) => void; // 테스트 모드 변경 함수
}

// 초기 보물 데이터
const initialTreasuresData: Treasure[] = [
  {
    id: 1,
    name: '카페 봉황 1935',
    subtitle: '1935년',
    description: '일제강점기 적산가옥을 리모델링한 다국적 향취의 카페',
    icon: '🏛️',
    found: false,
    quiz: {
      image: '/bonghwang1935.png', // 이미지 경로 수정
      question: '현재는 카페가 된 봉황 1935는 몇년도에 세워진 건물일까요?',
      answer: '1935'
    }
  },
  {
    id: 2,
    name: '미야상회',
    subtitle: '전통',
    description: '어릴 적 동네에 있던 작은 상점의 정취를 간직한 곳',
    icon: '🏪',
    found: false,
    quiz: {
      image: '/quiz/miya.jpg',
      question: '미야상회 사장님의 이름은 무엇일까요?',
      answer: '경미'
    }
  },
  {
    id: 3,
    name: '탱자카페',
    subtitle: '정원',
    description: '아름다운 정원과 고즈넉한 분위기가 매력적인 전통 찻집',
    icon: '🌳',
    found: false,
    quiz: {
      image: '/quiz/taengja.jpg',
      question: '탱자카페에는 탱자나무가 있다, 없다?',
      answer: '있다'
    }
  },
  // ... 나머지 13개 보물 데이터 ...
  // (나머지 데이터는 퀴즈 내용을 임시로 채워넣겠습니다)
  { id: 4, name: '달빛조각', subtitle: '공방', description: '...', icon: '🌙', found: false, quiz: { image: '', question: 'Q4', answer: 'A4' } },
  { id: 5, name: '별가루', subtitle: '소품샵', description: '...', icon: '✨', found: false, quiz: { image: '', question: 'Q5', answer: 'A5' } },
  { id: 6, name: '봉황깃털', subtitle: '기념품', description: '...', icon: '🪶', found: false, quiz: { image: '', question: 'Q6', answer: 'A6' } },
  { id: 7, name: '수로왕인장', subtitle: '유물', description: '...', icon: '👑', found: false, quiz: { image: '', question: 'Q7', answer: 'A7' } },
  { id: 8, name: '옥구슬', subtitle: '보석', description: '...', icon: '🟢', found: false, quiz: { image: '', question: 'Q8', answer: 'A8' } },
  { id: 9, name: '황금열쇠', subtitle: '미스터리', description: '...', icon: '🔑', found: false, quiz: { image: '', question: 'Q9', answer: 'A9' } },
  { id: 10, name: '시간의 모래', subtitle: '유물', description: '...', icon: '⏳', found: false, quiz: { image: '', question: 'Q10', answer: 'A10' } },
  { id: 11, name: '지혜의 두루마리', subtitle: '고서', description: '...', icon: '📜', found: false, quiz: { image: '', question: 'Q11', answer: 'A11' } },
  { id: 12, name: '용기의 물약', subtitle: '비약', description: '...', icon: '🧪', found: false, quiz: { image: '', question: 'Q12', answer: 'A12' } },
  { id: 13, name: '고요의 피리', subtitle: '악기', description: '...', icon: '🎶', found: false, quiz: { image: '', question: 'Q13', answer: 'A13' } },
  { id: 14, name: '수호의 방패', subtitle: '장비', description: '...', icon: '🛡️', found: false, quiz: { image: '', question: 'Q14', answer: 'A14' } },
  { id: 15, name: '인연의 실', subtitle: '전설', description: '...', icon: '❤️', found: false, quiz: { image: '', question: 'Q15', answer: 'A15' } },
  { id: 16, name: '가야의 왕관', subtitle: '국보', description: '...', icon: '👑', found: false, quiz: { image: '', question: 'Q16', answer: 'A16' } },
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