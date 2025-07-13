"use client";

import React, { useEffect, useState } from 'react';
import { useTreasures } from '@/context/TreasureContext';

const Treasure = () => {
  const { treasures, findTreasure } = useTreasures();
  const [completedLines, setCompletedLines] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const lines = [
      [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
      [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
      [0, 5, 10, 15], [3, 6, 9, 12]
    ];
    let count = 0;
    lines.forEach(line => {
      if (line.every(index => treasures[index]?.found)) {
        count++;
      }
    });
    setCompletedLines(count);
  }, [treasures, isClient]);

  const handleToggleTreasure = (id: number) => {
    // This is a test function to easily toggle treasure status
    findTreasure(id); 
  };

  return (
    <div className="treasure-container">
      <div className="status-summary">
        <div><span>{completedLines}</span><p>빙고</p></div>
        <div><span>{treasures.filter(t => t.found).length}</span><p>보물 수집</p></div>
      </div>
      <div className="treasure-grid">
        {treasures.map(treasure => (
          <div key={treasure.id} className={`treasure-item ${treasure.found ? 'found' : ''}`} onClick={() => handleToggleTreasure(treasure.id)}>
            <div className="treasure-icon">{treasure.icon}</div>
            <span>{treasure.name}</span>
          </div>
        ))}
      </div>
      <div className="reward-section">
        <h3>🎁 선물 교환소</h3>
        <div className={`reward-card ${completedLines >= 1 ? 'unlocked' : ''}`}>
            <div className="reward-icon">☕</div>
            <div className="reward-info">
                <h4>1빙고 달성!</h4>
                <p>아메리카노 1잔 증정</p>
            </div>
            {completedLines >= 1 && <div className="reward-status">✔️ 달성 완료 - 봉황하숙에서 교환 가능</div>}
        </div>
        <div className={`reward-card ${completedLines >= 3 ? 'unlocked' : ''}`}>
            <div className="reward-icon">🎁</div>
            <div className="reward-info">
                <h4>3빙고 달성!</h4>
                <p>DMO 선물세트 증정</p>
            </div>
             {completedLines < 3 && <div className="reward-lock">🔒 3빙고 달성 시 해제</div>}
        </div>
        <div className="reward-location">
            📍 선물 교환 장소: 봉황하숙 (봉황대길 중앙)
            <p>영업시간: 10:00 - 20:00</p>
        </div>
      </div>
      <button className="share-button">빙고 현황 공유하기</button>
      <style jsx>{`
        /* Styles to match the new design */
        .treasure-container { padding: 10px 0; }
        .status-summary { display: flex; justify-content: space-around; background: #f8f9fa; padding: 16px; border-radius: 12px; margin-bottom: 20px; }
        .status-summary > div { text-align: center; }
        .status-summary span { font-size: 1.8rem; font-weight: bold; }
        .status-summary p { font-size: 0.9rem; color: #6c757d; }
        .treasure-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 20px 0; }
        .treasure-item { 
          cursor: pointer;
          aspect-ratio: 1 / 1; 
          background: #f0f2f5; 
          border-radius: 12px; 
          display: flex; 
          flex-direction: column;
          align-items: center; 
          justify-content: center; 
          gap: 8px;
          filter: grayscale(100%);
          opacity: 0.5;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        .treasure-item:hover { transform: scale(1.05); }
        .treasure-item.found { filter: none; opacity: 1; background: #fff; border-color: #fca5a5; box-shadow: 0 4px 10px rgba(252, 165, 165, 0.3); }
        .treasure-icon { font-size: 2rem; }
        span { font-size: 11px; text-align: center; }
        .reward-section { display: flex; flex-direction: column; gap: 12px; margin: 30px 0; }
        .reward-card { display: flex; gap: 16px; padding: 16px; border-radius: 12px; background: #f8f9fa; align-items: center; opacity: 0.5; }
        .reward-card.unlocked { opacity: 1; }
        .reward-icon { font-size: 2rem; }
        .reward-info h4 { font-weight: bold; }
        .reward-info p { font-size: 0.9rem; color: #6c757d; }
        .reward-status { margin-left: auto; font-size: 0.8rem; color: #20c997; font-weight: bold; }
        .reward-lock { margin-left: auto; font-size: 0.8rem; color: #6c757d; }
        .reward-location { text-align: center; padding: 16px; background: #f0f2f5; border-radius: 12px; font-size: 0.9rem; }
        .share-button { width: 100%; padding: 16px; border-radius: 12px; border: none; background: #6d28d9; color: white; font-size: 1rem; font-weight: bold; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default Treasure; 