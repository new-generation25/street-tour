"use client";

import React from 'react';
import TreasureList from '@/components/TreasureList'; // TreasureList 컴포넌트 import
import { useTreasures } from '@/context/TreasureContext';

const Treasure = () => {
  // 2. 필요한 모든 데이터와 함수를 context에서 가져오기
  const { bingoCount, isClient } = useTreasures();
  
  // 클라이언트 측에서만 렌더링되도록 처리 (Hydration 오류 방지)
  if (!isClient) {
    return null;
  }

  return (
    <div className="treasure-container">
      <div className="bingo-status">
        <h2>달성한 빙고: {bingoCount}개</h2>
        <p>빙고를 완성하고 특별한 보상을 받으세요!</p>
      </div>

      {/* 3. TreasureList 컴포넌트를 여기서 사용 */}
      <TreasureList />

      <div className="reward-section">
        <h3>🎁 선물 교환소</h3>
        <div className={`reward-card ${bingoCount >= 1 ? 'unlocked' : ''}`}>
          <div className="reward-icon">☕</div>
          <div className="reward-info">
            <h4>1빙고 달성!</h4>
            <p>아메리카노 1잔 증정</p>
          </div>
          {bingoCount >= 1 && <div className="reward-status">✔️</div>}
        </div>
        <div className={`reward-card ${bingoCount >= 3 ? 'unlocked' : ''}`}>
          <div className="reward-icon">🎁</div>
          <div className="reward-info">
            <h4>3빙고 달성!</h4>
            <p>DMO 선물세트 증정</p>
          </div>
          {bingoCount < 3 && <div className="reward-lock">🔒 3빙고 달성 시 해제</div>}
        </div>
        <div className="reward-location">
          📍 선물 교환 장소: 봉황하숙 (봉황대길 중앙)
          <p>영업시간: 10:00 - 20:00</p>
        </div>
      </div>


      <style jsx>{`
        .treasure-container {
          padding: 10px 0;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .bingo-status {
          text-align: center;
        }
        .bingo-status h2 {
          font-size: 1.8rem;
          font-weight: bold;
          color: #343a40;
        }
        .bingo-status p {
          font-size: 0.9rem;
          color: #6c757d;
          margin-top: 5px;
        }
        .reward-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .reward-section h3 {
          font-size: 1.2rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 8px;
          color: #000000;
        }
        .reward-card {
          display: flex;
          gap: 16px;
          padding: 16px;
          border-radius: 12px;
          background: #fff;
          align-items: center;
          opacity: 0.5;
          border: 1px solid #e9ecef;
          transition: all 0.3s ease;
        }
        .reward-card.unlocked {
          opacity: 1;
          border-color: var(--primary);
        }
        .reward-icon {
          font-size: 2rem;
        }
        .reward-info h4 {
          font-weight: bold;
          margin: 0;
          color: #000000;
        }
        .reward-info p {
          font-size: 0.9rem;
          color: #6c757d;
          margin: 4px 0 0 0;
        }
        .reward-status, .reward-lock {
          margin-left: auto;
          font-size: 1.5rem;
        }
        .reward-location {
          margin-top: 16px;
          text-align: center;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 12px;
          font-size: 0.9rem;
          color: #495057;
        }
        .reward-location p {
          margin: 4px 0 0 0;
          font-size: 0.8rem;
          color: #6c757d;
        }
      `}</style>
    </div>
  );
};

export default Treasure; 