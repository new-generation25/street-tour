"use client";

import React from 'react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { name: '스토리', icon: '📖' },
  { name: '탐험', icon: '🗺️' },
  { name: '보물', icon: '💎' }
];

export const BottomNav = ({ activeTab, setActiveTab }: BottomNavProps) => {
  return (
    <div className="bottom-nav-container">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={`nav-button ${activeTab === tab.name ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.name)}
        >
          <span className="icon">{tab.icon}</span>
          <span>{tab.name}</span>
        </button>
      ))}
      <style jsx>{`
        .bottom-nav-container {
          display: flex;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background-color: var(--nav-purple);
          backdrop-filter: blur(0);
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
          max-width: 480px;
          margin: 0 auto;
        }
        .nav-button {
          flex: 1;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          color: #e9ecef; /* 아이콘/텍스트 기본 색상 변경 */
          font-size: 0.7rem;
        }
        .icon {
          font-size: 1.5rem;
        }
        .nav-button.active {
          color: #ffffff; /* 활성화 시 색상을 흰색으로 변경 */
        }
        .nav-button.active .nav-icon {
          transform: scale(1.1);
        }
        .nav-icon {
          font-size: 1.5rem;
        }
        .nav-button.active span:last-child {
            font-weight: 700;
        }
      `}</style>
    </div>
  );
}; 