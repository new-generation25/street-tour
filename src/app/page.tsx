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
        
        <main className="content-area">
          {renderContent()}
        </main>
        
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </TreasureProvider>
  );
}
