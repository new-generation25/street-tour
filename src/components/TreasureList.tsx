"use client";

import React from 'react';
import { useTreasures } from '@/context/TreasureContext';

const TreasureList = () => {
  const { treasures, toggleTreasure, testMode } = useTreasures();
  
  // 'initialTreasures' is assigned a value but never used.  @typescript-eslint/no-unused-vars 오류 해결
  // const initialTreasures = treasures; 

  if (!treasures) {
    return <div>보물 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="treasure-list-container">
      <h2>보물 목록</h2>
      <ul>
        {treasures.map((treasure) => (
          <li key={treasure.id} className={treasure.found ? 'found' : ''}>
            <span>{treasure.name}</span>
            {!treasure.found && (
              <button onClick={() => toggleTreasure(treasure.id)}>찾기</button>
            )}
          </li>
        ))}
      </ul>
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