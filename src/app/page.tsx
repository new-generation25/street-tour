"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import Progress from "@/components/Progress";
import Story from './Story';
import Exploration from './Exploration';
import Treasure from './Treasure';
import Community from './Community';
import { BottomNav } from '@/components/BottomNav';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('스토리');

  const renderContent = () => {
    switch (activeTab) {
      case '스토리':
        return <Story onNext={() => setActiveTab('탐험')} />;
      case '탐험':
        return <Exploration />;
      case '보물':
        return <Treasure />;
      case '커뮤니티':
        return <Community />;
      default:
        return <Story onNext={() => setActiveTab('탐험')} />;
    }
  };

  return (
    <>
      {showIntro && (
        <div className="intro-screen">
          <div className="intro-overlay">
            <img src="/bonghwang-memories.png" alt="봉황대 메이즈러너 인트로" className="intro-image" />
            <div className="intro-gradient" />
            <div className="intro-content">
              <h1>봉황대 메이즈러너</h1>
              <p>골목 투어 어드벤처를 지금 시작해보세요</p>
              <button className="intro-button" onClick={() => setShowIntro(false)}>
                여행 시작하기
              </button>
            </div>
          </div>
        </div>
      )}

      {!showIntro && (
        <div className="app-container">
          <Header />
          <Progress />

          <main className="main-content">
            {renderContent()}
          </main>

          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      )}

      <style jsx global>{`
        .app-container {
          max-width: 480px;
          margin: 0 auto;
          background-color: #f0f0f0;
        }
        .main-content {
          padding-bottom: 80px; /* BottomNav 높이만큼 패딩 추가 */
        }
        .intro-screen {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1f1745, #2c1c5a);
          animation: fade-in 0.8s ease forwards;
        }
        .intro-overlay {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 480px;
          overflow: hidden;
        }
        .intro-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.8);
          animation: zoom-in 4s ease forwards;
        }
        .intro-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.7) 80%);
        }
        .intro-content {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          color: #fff;
          padding: 0 24px;
          width: 100%;
        }
        .intro-content h1 {
          font-size: 2rem;
          margin-bottom: 12px;
          letter-spacing: 1px;
        }
        .intro-content p {
          margin-bottom: 24px;
          color: rgba(255,255,255,0.9);
        }
        .intro-button {
          background: linear-gradient(135deg, #ffcc00, #ff9500);
          color: #1f1745;
          border: none;
          border-radius: 999px;
          padding: 14px 28px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 12px 24px rgba(0,0,0,0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .intro-button:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 16px 28px rgba(0,0,0,0.35);
        }
        .intro-button:active {
          transform: translateY(0);
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in {
          from { transform: scale(1.05); }
          to { transform: scale(1); }
        }
      `}</style>
    </>
  );
}
