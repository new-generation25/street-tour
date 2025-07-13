"use client";
import React from 'react';
import Image from 'next/image';

interface StoryProps {
  onStart: () => void;
}

const Story = ({ onStart }: StoryProps) => {
  return (
    <div className="story-container">
      <div className="story-content">
        <div className="main-image-wrapper">
          <Image 
            src="/jjack-story.png" 
            alt="짹과 봉황대 유리 목걸이의 비밀" 
            width={400} 
            height={400}
            priority // 우선적으로 로드
          />
        </div>
        <div className="story-box">
          <h2>집안의 가보로 내려온 유리구슬 목걸이</h2>
          <p>
            짹은 할머니 집에서 오래된 유리구슬 목걸이를 발견한다.
            <br />
            집안의 가보로 내려오던 유리구슬 목걸이는 할머니가 짹의 아버지에게 물려줄 예정이었다.
          </p>
          <p>
            하지만 짹은 한눈에 유리구슬 목걸이가 자신의 것임을 알았고 할머니의 이야기를 듣지않고 가져가 버린다.
          </p>
          <p>
            하지만 짹은 그 목걸이의 진정한 힘을 알지 못했는데...
            <br />
            과연 유리구슬 목걸이에는 어떤 힘이 담겨 있었던 것일까?
          </p>
        </div>
      </div>
      <button onClick={onStart} className="start-button">탐험 시작하기</button>

      <style jsx>{`
        .story-container {
          padding: 0; /* 전체 패딩은 제거 */
          text-align: center;
          display: flex;
          flex-direction: column;
        }
        .story-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 24px;
        }
        .main-image-wrapper {
          width: 100%;
          margin-bottom: 24px;
        }
        .story-box {
          background-color: rgba(108, 99, 255, 0.1);
          border: 1px solid rgba(108, 99, 255, 0.2);
          border-radius: 16px;
          padding: 24px;
          text-align: left; /* 텍스트 왼쪽 정렬 */
          margin: 0 16px; /* 좌우 여백 추가 */
        }
        h2 {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 1.5rem; /* 제목과 내용 사이 간격 추가 */
          text-align: center; /* 제목만 중앙 정렬 */
        }
        p {
          line-height: 1.7; /* 줄 간격 조정 */
          margin-bottom: 1rem; /* 문단 사이 간격 추가 */
        }
        p:last-child {
            margin-bottom: 0;
        }
        .start-button {
          background: linear-gradient(to right, #fde047, #f97316);
          color: #4a3f2d;
          border: none;
          border-radius: 9999px;
          padding: 16px 32px;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s;
          margin: 24px 16px 0; /* 상하좌우 여백 추가 */
        }
        .start-button:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Story; 