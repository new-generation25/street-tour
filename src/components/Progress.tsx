"use client";

// src/components/Progress.tsx
import React from 'react';
import { useTreasures } from '@/context/TreasureContext';

const Progress = () => {
  const { foundCount, totalCount } = useTreasures();
  const percentage = totalCount > 0 ? (foundCount / totalCount) * 100 : 0;

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="progress-fill" id="progressFill" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="progress-text">
        <span id="progressText">{`${foundCount}/${totalCount} 보물 수집완료`}</span>
      </div>
      <style jsx>{`
        .progress-container {
            padding: 20px;
            background: #f8f9fa;
        }
        .progress-bar {
            background: #e9ecef;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        .progress-fill {
            height: 20px;
            background: linear-gradient(90deg, #28a745, #20c997);
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
            color: #495057; /* 더 어두운 색으로 변경 */
            text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Progress; 