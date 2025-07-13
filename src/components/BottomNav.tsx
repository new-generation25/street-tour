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
    <nav className="bottom-nav-container">
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
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 70px; /* 높이 증가 */
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: #ffffff;
          border-top: 1px solid #f0f0f0;
          max-width: 420px; /* app-container와 동일하게 */
          margin: 0 auto;
          box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
        }
        .nav-button {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: #999;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s;
          padding: 8px;
          border-radius: 8px;
        }
        .icon {
          font-size: 1.5rem;
        }
        .nav-button.active {
          color: #6d28d9; /* 활성 탭 색상 (시안 참고) */
          transform: translateY(-2px);
        }
        .nav-button.active span:last-child {
            font-weight: 700;
        }
      `}</style>
    </nav>
  );
}; 