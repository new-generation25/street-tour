"use client";

import Story from '../Story';
import { Header } from '@/components/Header';
import Progress from '@/components/Progress';
import { BottomNav } from '@/components/BottomNav';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StoryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('스토리');

  const handleNext = () => {
    // 메인 페이지로 이동
    router.push('/');
  };

  return (
    <div className="app-container">
      <Header />
      <Progress />

      <main className="main-content">
        <Story onNext={handleNext} />
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <style jsx global>{`
        .app-container {
          max-width: 480px;
          margin: 0 auto;
          background-color: var(--body-background);
          min-height: 100vh;
          min-height: -webkit-fill-available;
          position: relative;
          overflow-x: hidden;
          width: 100%;
        }
        .main-content {
          padding-bottom: 80px; /* BottomNav 높이만큼 패딩 추가 */
        }
      `}</style>
    </div>
  );
}

