"use client";

import React from 'react';
import TreasureList from '@/components/TreasureList'; // TreasureList 컴포넌트 import
import { useTreasures } from '@/context/TreasureContext';

const Treasure = () => {
  // 2. 필요한 모든 데이터와 함수를 context에서 가져오기
  const { bingoCount, isClient, testMode, setTestMode } = useTreasures();
  
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
        <h3>획득 가능한 보상</h3>
        <div className="reward-item">🎁 특별 굿즈</div>
        <div className="reward-item">🎟️ 히든 스테이지 입장권</div>
      </div>

      {/* 4. 테스트 모드 토글 버튼 추가 */}
      <div className="test-mode-toggle">
        <label>
          <input 
            type="checkbox" 
            checked={testMode} 
            onChange={(e) => setTestMode(e.target.checked)}
          />
          보물 찾기 테스트 모드 활성화
        </label>
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
        }
        .reward-item {
          padding: 16px;
          border-radius: 12px;
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          font-size: 1rem;
          font-weight: bold;
          text-align: center;
        }
        .test-mode-toggle {
          margin-top: 16px;
          padding: 12px;
          background-color: #f0f2f5;
          border-radius: 8px;
          text-align: center;
          font-size: 0.9rem;
        }
        .test-mode-toggle label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Treasure; 