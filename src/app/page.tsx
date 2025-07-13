"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import Progress from "@/components/Progress";
import Story from './Story';
import Exploration from './Exploration';
import Treasure from './Treasure';
import { BottomNav } from '@/components/BottomNav';
import { TreasureProvider } from "@/context/TreasureContext";

export default function Home() {
  const [activeTab, setActiveTab] = useState('스토리');

  const renderContent = () => {
    switch (activeTab) {
      case '스토리':
        return <Story onStart={() => setActiveTab('탐험')} />;
      case '탐험':
        return <Exploration />;
      case '보물':
        return <Treasure />;
      default:
        return <Story onStart={() => setActiveTab('탐험')} />;
    }
  };

  return (
    <TreasureProvider>
      <div className="app-container">
        <Header />
        <Progress />
        
        <main className="main-content">
          {renderContent()}
        </main>
        
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <style jsx global>{`
        .app-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          max-width: 480px; /*一般的なモバイル画面の最大幅*/
          margin: 0 auto;
          background-color: #f0f0f0; /* 부드러운 회색 배경 */
        }
        .main-content {
          flex: 1;
          overflow-y: auto; /* 콘텐츠가 길어지면 스크롤 */
          padding-bottom: 80px; /* BottomNav 높이만큼 패딩 추가 */
        }
      `}</style>
    </TreasureProvider>
  );
}
