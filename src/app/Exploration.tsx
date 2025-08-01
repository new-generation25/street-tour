"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTreasures, Treasure } from '@/context/TreasureContext';
import Confetti from 'react-confetti';
import NaverMap from '@/components/NaverMap';
import QrScanner from '@/components/QrScanner'; // QrScanner 컴포넌트 import

const Exploration = () => {
  const [activeSubTab, setActiveSubTab] = useState('지도');
  const [openQuizId, setOpenQuizId] = useState<number | null>(null);
  const { treasures, findTreasure } = useTreasures();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => {
        setToast({ message: '', type: '' });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // 탐험 페이지 진입 시 최상단으로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 탭 변경 시 지도 탭이면 최상단으로 스크롤
  useEffect(() => {
    if (activeSubTab === '지도') {
      window.scrollTo(0, 0);
    }
  }, [activeSubTab]);

  const handleQrScanSuccess = (scannedData: string) => {
    // 문자열에 포함된 첫 숫자 시퀀스를 추출
    const numericMatch = scannedData.match(/(\d+)/);
    const treasureId = numericMatch ? parseInt(numericMatch[1], 10) : NaN;
    if (!isNaN(treasureId)) {
      const targetTreasure = treasures.find(t => t.id === treasureId);
      // 해당 보물이 존재하고 아직 찾지 않았다면
      if (targetTreasure && !targetTreasure.found) {
        findTreasure(treasureId);
        setShowConfetti(true);
        setToast({ message: `'${targetTreasure.name}' 보물을 찾았습니다!`, type: 'success' });
        setTimeout(() => setShowConfetti(false), 4000);
      } else if (targetTreasure && targetTreasure.found) {
        setToast({ message: '이미 찾은 보물입니다!', type: 'error' });
      } else {
        setToast({ message: '유효하지 않은 QR 코드입니다.', type: 'error' });
      }
    } else {
      setToast({ message: '숫자 형식의 QR 코드가 아닙니다.', type: 'error' });
    }
  };

  const renderSubContent = () => {
    switch (activeSubTab) {
      case '지도':
        return <NaverMap key={`map-${Date.now()}`} treasures={treasures} onMarkerClick={handleMapMarkerClick} />;
      case 'QR':
        return <QrScanner onScan={handleQrScanSuccess} onError={(error) => {
          console.error("QR Scanner Error:", error);
          setToast({ message: '카메라를 열 수 없습니다.', type: 'error' });
        }} />;
      case 'AR':
        return <div className="feature-placeholder">AR 뷰가 여기에 표시됩니다.</div>;
      default:
        return null;
    }
  };

  const handleLocationClick = (treasureId: number) => {
    setOpenQuizId(prevId => (prevId === treasureId ? null : treasureId)); // 클릭 시 퀴즈 열고 닫기
  };

  const handleMapMarkerClick = (treasureId: number) => {
    // 해당 가게로 스크롤 (탭 전환 없이)
    const element = document.getElementById(`treasure-${treasureId}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      // 질문 자동으로 열기
      setOpenQuizId(treasureId);
    }
  };

  const handleQuizSubmit = (treasureId: number, answer: string) => {
    const treasure = treasures.find(t => t.id === treasureId);
    if (treasure && treasure.quiz.answer === answer) {
      findTreasure(treasureId);
      // 폭죽과 토스트가 동시에 나타나도록 순서 조정
      setShowConfetti(true);
      setToast({ message: '정답입니다.\n보물을 찾았습니다', type: 'success' });
      setTimeout(() => setShowConfetti(false), 4000); // 4초 후 폭죽 사라짐
      setOpenQuizId(null);
    } else {
      setToast({ message: '틀렸습니다. 다시 시도해보세요!', type: 'error' });
    }
  };

  return (
    <div className="page-container">
      {showConfetti && <Confetti 
        recycle={false} 
        numberOfPieces={1000} // 양을 5배로 증가
        gravity={0.15} // 중력 효과 추가
        initialVelocityY={-10} // 위로 솟구치는 효과
        style={{ zIndex: 9999 }} 
        onConfettiComplete={(confetti) => {
          if (confetti) {
            confetti.reset();
            setShowConfetti(false);
          }
        }}
      />}
      {toast.message && <Toast message={toast.message} type={toast.type} />}

      {/* 1. 지도 또는 기능 표시부 */}
      <div className="feature-display-box">
        {renderSubContent()}
      </div>

      {/* 2. 지도/QR/AR 탭 */}
      <div className="sub-nav">
        <button onClick={() => setActiveSubTab('지도')} className={activeSubTab === '지도' ? 'active' : ''}>지도</button>
        <button onClick={() => setActiveSubTab('QR')} className={activeSubTab === 'QR' ? 'active' : ''}>QR</button>
        <button onClick={() => setActiveSubTab('AR')} className={activeSubTab === 'AR' ? 'active' : ''}>AR</button>
      </div>

      {/* 3. 장소 목록 */}
      <div className="location-list">
        <ul>
          {treasures.map(treasure => (
            <React.Fragment key={treasure.id}>
              <li 
                id={`treasure-${treasure.id}`}
                className={treasure.found ? 'found item-card' : 'item-card'}
                onClick={() => handleLocationClick(treasure.id)}
              >
                <div className="item-icon">{treasure.icon}</div>
                <div className="item-content">
                  <h4>{treasure.name} <span>{treasure.subtitle}</span></h4>
                  <p>{treasure.description}</p>
                  {treasure.found && <div className="found-check">✔️</div>}
                </div>
              </li>
              {openQuizId === treasure.id && (
                <QuizBox treasure={treasure} onSubmit={handleQuizSubmit} />
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .page-container {
          padding: 10px 16px; /* 좌우 패딩 추가 */
          position: relative; /* Toast 메시지 위치 기준 */
        }
        .feature-display-box {
          height: 250px; /* 추가: 지도가 표시될 영역의 높이를 지정 */
          margin-bottom: 16px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #dee2e6;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          background-color: var(--ui-background); /* 지도 배경 흰색으로 유지 */
        }
        .map-image-wrapper {
            position: relative;
            width: 100%;
            height: 250px; 
        }
        .feature-placeholder {
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--ui-fill);
          color: var(--text-secondary);
        }
        .sub-nav {
          display: flex;
          background-color: var(--ui-background);
          border-radius: 8px;
          padding: 4px;
          margin-bottom: 24px;
        }
        .sub-nav button {
          flex: 1;
          padding: 8px 12px;
          border: none;
          background-color: transparent;
          color: var(--text-secondary);
          font-weight: bold;
          cursor: pointer;
          border-radius: 6px;
          transition: background-color 0.3s, color 0.3s;
        }
        .sub-nav button.active {
          background-color: var(--tab-purple);
          color: var(--text-white);
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .location-list ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .item-card {
          display: flex;
          gap: 16px;
          background-color: var(--mission-incomplete);
          padding: 16px;
          border-radius: 12px;
          border: 2px solid var(--mission-incomplete);
          position: relative;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }
        .item-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .item-card.found {
          background-color: var(--mission-complete);
          border-color: var(--mission-complete);
          color: var(--text-white);
          box-shadow: 0 4px 12px rgba(249, 132, 29, 0.3);
        }
        .item-icon {
            font-size: 2.5rem;
            background-color: transparent;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            flex-shrink: 0;
            border: none;
        }
        .item-card.found .item-icon {
            background-color: transparent;
            border: none;
        }
        .item-content h4 {
            font-weight: bold;
            margin-bottom: 4px;
            color: var(--text-primary);
        }
        .item-card.found .item-content h4 {
            color: var(--text-white);
        }
        .item-content h4 span {
            font-size: 0.8rem;
            color: var(--text-tertiary);
            font-weight: normal;
            margin-left: 8px;
        }
        .item-card.found .item-content h4 span {
            color: rgba(255, 255, 255, 0.8);
        }
        .item-content p {
            font-size: 0.9rem;
            color: var(--text-secondary);
        }
        .item-card.found .item-content p {
            color: rgba(255, 255, 255, 0.9);
        }
        .found-check {
            position: absolute;
            top: 16px;
            right: 16px;
            font-size: 1.5rem;
            color: var(--text-white);
        }
      `}</style>
    </div>
  );
};

// 퀴즈 UI를 별도 컴포넌트로 분리
const QuizBox = ({ treasure, onSubmit }: { treasure: Treasure, onSubmit: (id: number, answer: string) => void }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(treasure.id, answer);
  };

  return (
    <div className="quiz-box">
      {treasure.quiz.image && (
        <div className="quiz-image-wrapper">
          <Image src={treasure.quiz.image} alt={treasure.name} layout="responsive" width={16} height={9} />
        </div>
      )}
      <div className="quiz-content">
        <p className="quiz-question">{treasure.quiz.question}</p>
        <form onSubmit={handleSubmit} className="quiz-form">
          <input 
            type="text" 
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="정답을 입력하세요"
            className="quiz-input"
          />
          <button type="submit" className="quiz-submit">정답 확인</button>
        </form>
      </div>
      <style jsx>{`
        .quiz-box {
          background-color: var(--ui-fill); /* 퀴즈 박스 배경색 변경 */
          margin: 0;
          padding: 20px;
          border-radius: 0 0 12px 12px;
          border: 1px solid var(--ui-border);
          border-top: none;
          animation: slide-down 0.3s ease-out;
          margin-top: -12px; /* li와 자연스럽게 연결 */
          margin-bottom: 12px;
          z-index: 10; /* 다른 요소 위에 있도록 z-index 추가 */
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .quiz-image-wrapper {
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 16px;
        }
        .quiz-question {
          font-weight: bold;
          margin-bottom: 12px;
          color: var(--text-primary); /* 질문 글자색 진하게 */
        }
        .quiz-form {
          display: flex;
          gap: 8px;
        }
        .quiz-input {
          flex-grow: 1;
          padding: 10px;
          border: 1px solid var(--ui-separator);
          border-radius: 6px;
          color: var(--text-primary); /* 입력 글자색 검정으로 지정 */
        }
        .quiz-submit {
          padding: 10px 16px;
          border: none;
          background-color: var(--primary-dark);
          color: var(--text-white);
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}

// Toast 컴포넌트 추가
const Toast = ({ message, type }: { message: string; type: 'success' | 'error' | '' }) => {
  return (
    <div className={`toast ${type}`}>
      {message}
      <style jsx>{`
        .toast {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 16px 32px;
          border-radius: 12px;
          color: white;
          font-weight: bold;
          z-index: 1000;
          animation: fade-in-out 2.5s ease-in-out forwards;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          text-align: center;
          white-space: pre-line;
        }
        .toast.success {
          background-color: var(--success);
        }
        .toast.error {
          background-color: var(--error);
        }
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
      `}</style>
    </div>
  );
};

export default Exploration;