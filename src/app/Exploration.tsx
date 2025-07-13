"use client";

import React, { useState } from 'react';
import Image from 'next/image'; // Image 컴포넌트 import
import { useTreasures } from '@/context/TreasureContext';

const Exploration = () => {
  const [activeSubTab, setActiveSubTab] = useState('지도');
  const [openQuizId, setOpenQuizId] = useState<number | null>(null); // 현재 열린 퀴즈 ID 상태
  const { treasures, findTreasure } = useTreasures();

  const renderSubContent = () => {
    switch (activeSubTab) {
      case '지도':
        return (
          <div className="map-image-wrapper">
            <Image 
              src="/map-placeholder.png" 
              alt="지도" 
              layout="fill" 
              objectFit="cover"
            />
          </div>
        );
      case 'QR':
        return <div className="feature-placeholder">QR 코드 스캐너가 여기에 표시됩니다.</div>;
      case 'AR':
        return <div className="feature-placeholder">AR 뷰가 여기에 표시됩니다.</div>;
      default:
        return null;
    }
  };

  const handleLocationClick = (treasureId: number) => {
    setOpenQuizId(prevId => (prevId === treasureId ? null : treasureId)); // 클릭 시 퀴즈 열고 닫기
  };

  const handleQuizSubmit = (treasureId: number, answer: string) => {
    const treasure = treasures.find(t => t.id === treasureId);
    if (treasure && treasure.quiz.answer === answer) {
      findTreasure(treasureId);
      alert('정답입니다! 보물을 획득했습니다.');
      setOpenQuizId(null); // 퀴즈 닫기
    } else {
      alert('틀렸습니다. 다시 시도해보세요!');
    }
  };

  return (
    <div className="page-container">
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
          padding: 10px 0;
        }
        .feature-display-box {
          margin-bottom: 16px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #dee2e6;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .map-image-wrapper {
            position: relative; /* Image의 layout="fill"을 위해 필수 */
            width: 100%;
            height: 250px; 
        }
        .feature-placeholder {
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #e9ecef;
          color: #495057;
        }
        .sub-nav {
          display: flex;
          background-color: #fff;
          border-radius: 8px;
          padding: 4px;
          margin-bottom: 24px;
        }
        .sub-nav button {
          flex: 1;
          padding: 8px 12px;
          border: none;
          background-color: transparent;
          color: #495057;
          font-weight: bold;
          cursor: pointer;
          border-radius: 6px;
          transition: background-color 0.3s, color 0.3s;
        }
        .sub-nav button.active {
          background-color: #845ef7;
          color: #fff;
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
          background-color: #ffffff; /* 가독성을 위해 흰색 배경으로 변경 */
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #e9ecef;
          position: relative;
          cursor: pointer; /* 클릭 가능함을 표시 */
        }
        .item-card.found {
          border-left: 5px solid #32cd32; /* 더 잘보이는 초록색으로 변경 */
        }
        .item-icon {
            font-size: 2.5rem;
            background-color: #f1f3f5;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            flex-shrink: 0;
        }
        .item-content h4 {
            font-weight: bold;
            margin-bottom: 4px;
        }
        .item-content h4 span {
            font-size: 0.8rem;
            color: #6c757d;
            font-weight: normal;
            margin-left: 8px;
        }
        .item-content p {
            font-size: 0.9rem;
            color: #495057;
        }
        .found-check {
            position: absolute;
            top: 16px;
            right: 16px;
            color: #32cd32; /* 더 잘보이는 초록색으로 변경 */
        }
      `}</style>
    </div>
  );
};

// 퀴즈 UI를 별도 컴포넌트로 분리
const QuizBox = ({ treasure, onSubmit }: { treasure: any, onSubmit: (id: number, answer: string) => void }) => {
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
          background-color: #fff;
          margin: -12px 0 12px 0;
          padding: 20px;
          border-radius: 0 0 12px 12px;
          border: 1px solid #e9ecef;
          border-top: none;
          animation: slide-down 0.3s ease-out;
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
        }
        .quiz-form {
          display: flex;
          gap: 8px;
        }
        .quiz-input {
          flex-grow: 1;
          padding: 10px;
          border: 1px solid #ced4da;
          border-radius: 6px;
        }
        .quiz-submit {
          padding: 10px 16px;
          border: none;
          background-color: #845ef7;
          color: white;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}

export default Exploration; 