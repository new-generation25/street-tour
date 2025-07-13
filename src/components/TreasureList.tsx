"use client";

import React from 'react';

// 나중에 이 데이터는 외부에서 받아올 수 있습니다.
const initialTreasures = [
  { id: 1, name: '봉황대의 숨겨진 열쇠', found: true },
  { id: 2, name: '금관총의 빛나는 조각', found: true },
  { id: 3, name: '첨성대의 별가루', found: true },
  { id: 4, name: '대릉원의 고요한 돌', found: false },
  { id: 5, name: '월정교의 달빛 파편', found: false },
  { id: 6, name: '계림의 새벽 이슬', found: false },
  { id: 7, name: '황리단길의 비밀 레시피', found: false },
  { id: 8, name: '동궁과 월지의 연꽃 씨앗', found: false },
  { id: 9, name: '분황사 모전석탑의 작은 벽돌', found: false },
  { id: 10, name: '서출지의 잉크 방울', found: false },
  { id: 11, name: '남산의 소나무 솔방울', found: false },
  { id: 12, name: '교촌마을의 오래된 기와', found: false },
];

interface Treasure {
    id: number;
    name: string;
    found: boolean;
}

interface TreasureListProps {
  treasures: Treasure[];
  onFind: (id: number) => void;
}

export const TreasureList = ({ treasures, onFind }: TreasureListProps) => {
  return (
    <div className="treasure-list-container">
      <h2>보물 목록</h2>
      <ul>
        {treasures.map((treasure) => (
          <li key={treasure.id} className={treasure.found ? 'found' : ''}>
            <span>{treasure.name}</span>
            {!treasure.found && (
              <button onClick={() => onFind(treasure.id)}>찾기</button>
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