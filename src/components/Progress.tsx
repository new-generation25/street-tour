"use client";

// src/components/Progress.tsx
import React from 'react';
import { useTreasures } from '@/context/TreasureContext';

const Progress = () => {
  const { treasures } = useTreasures();
  
  const foundCount = treasures.filter(t => t.found).length;
  const totalCount = treasures.length;
  const percentage = totalCount > 0 ? (foundCount / totalCount) * 100 : 0;

  return (
    <div className="progress-container">
      <div className="progress-bar-wrapper">
        <div className="progress-bar">
          <div className="progress-fill" id="progressFill" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
      <div className="progress-text">{foundCount} / {totalCount} 보물 수집 완료</div>

      <style jsx>{`
        .progress-container {
          padding: 10px 16px;
          background-color: var(--ui-background);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .progress-bar-wrapper {
          background-color: var(--ui-fill);
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        .progress-fill {
            height: 20px;
            background: linear-gradient(90deg, var(--start-btn-yellow), var(--start-btn-orange));
            border-radius: 10px;
            transition: width 0.5s ease;
            position: relative;
        }
        .progress-fill::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255,255,255,0.3),
                transparent
            );
            animation: shimmer 2s ease-in-out infinite;
        }
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .progress-text {
            font-size: 0.9rem;
            color: var(--text-secondary); /* 더 어두운 색으로 변경 */
            text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Progress; 