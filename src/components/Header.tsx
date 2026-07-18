"use client";

import React from 'react';

export const Header = () => {
  return (
    <div className="header">
        <div className="logo-circle">💌</div>
        <h1>봉황 메모리즈</h1>
        <p>아버지의 타임캡슐</p>
      <style jsx>{`
        .header {
          background: unset;
          background-color: unset;
          color: var(--text-white);
          padding: 40px 20px 20px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            background: repeating-linear-gradient(
                45deg,
                rgba(255,255,255,0.1),
                rgba(255,255,255,0.1) 10px,
                transparent 10px,
                transparent 20px
            );
            animation: float 20s linear infinite;
            z-index: 1;
        }
        @keyframes float {
            0% { transform: translate(0,0) rotate(0deg); }
            100% { transform: translate(-10%,-10%) rotate(360deg); }
        }
        .logo-circle, h1, p {
            position: relative;
            z-index: 2;
        }
        .logo-circle {
            width: 60px;
            height: 60px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin: 0 auto 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        h1 {
            font-size: 1.8rem;
            font-weight: 800;
            margin-bottom: 4px;
        }
        p {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        .character {
          display: none; /* 기존 캐릭터는 숨김 */
        }
      `}</style>
    </div>
  );
}; 