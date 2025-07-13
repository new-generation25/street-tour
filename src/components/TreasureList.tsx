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
      <h2>보물 목록</h2>
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
        .treasure-list-container {
          padding: 20px;
          margin-top: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        h2 {
          margin-bottom: 15px;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #eee;
        }
        li.found {
          text-decoration: line-through;
          color: #aaa;
        }
        button {
          padding: 5px 10px;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default TreasureList; 