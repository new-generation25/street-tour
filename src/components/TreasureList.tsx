"use client";

import React from 'react';
import { useTreasures } from '@/context/TreasureContext';

const TreasureList = () => {
  const { treasures, toggleTreasure, testMode } = useTreasures();

  const handleItemClick = (id: number) => {
    if (testMode) {
      toggleTreasure(id);
    }
  };

  if (!treasures) {
    return <div>보물 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="treasure-list-container">
      <div className="treasure-grid">
        {treasures.map(treasure => (
          <div 
            key={treasure.id} 
            className={`treasure-item ${treasure.found ? 'found' : ''}`}
            onClick={() => handleItemClick(treasure.id)}
            style={{ cursor: testMode ? 'pointer' : 'default' }}
          >
            <div className="treasure-icon">{treasure.icon}</div>
            <div className="treasure-name">{treasure.name}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .treasure-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px; /* 간격을 10px에서 8px로 줄임 */
        }
        .treasure-item {
          aspect-ratio: 1 / 1;
          background-color: transparent;
          border: 2px solid var(--mission-incomplete);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4px; /* 패딩을 8px에서 4px로 줄임 */
          transition: all 0.2s ease-in-out;
          filter: grayscale(0%);
          opacity: 0.7;
        }
        .treasure-item.found {
          filter: grayscale(0%);
          opacity: 1;
          border-color: var(--mission-complete);
          background-color: var(--mission-complete);
          color: #fff;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(249, 132, 29, 0.3);
        }
        .treasure-icon {
          font-size: 2rem;
          line-height: 1;
        }
        .treasure-name {
          margin-top: 8px;
          font-size: 0.75rem;
          font-weight: 500;
          color: #495057;
        }
        .treasure-item.found .treasure-name {
          color: #fff;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default TreasureList; 