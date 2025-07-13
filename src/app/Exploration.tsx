"use client";

import React, { useState } from 'react';
import Image from 'next/image'; // Image 컴포넌트 import
import { useTreasures } from '@/context/TreasureContext';

const Exploration = () => {
  const [activeSubTab, setActiveSubTab] = useState('지도');
  const { treasures } = useTreasures();

  const renderSubContent = () => {
    switch (activeSubTab) {
      case '지도':
        // 가상 지도 이미지 삽입
        return (
          <div className="map-image-wrapper">
            <Image 
              src="/map-placeholder.png" 
              alt="지도" 
              layout="fill" 
              objectFit="cover"
            />
          </div>
        );
      case 'QR':
        return <div className="qr-placeholder">QR 코드 스캐너가 여기에 표시됩니다.</div>;
      case 'AR':
        return <div className="ar-placeholder">AR 뷰가 여기에 표시됩니다.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="exploration-container">
      {/* 1. 지도를 먼저 표시합니다. */}
      <div className="content-display">
        {renderSubContent()}
      </div>

      {/* 2. 그 아래에 탭을 표시합니다. */}
      <div className="sub-nav">
        <button onClick={() => setActiveSubTab('지도')} className={activeSubTab === '지도' ? 'active' : ''}>지도</button>
        <button onClick={() => setActiveSubTab('QR')} className={activeSubTab === 'QR' ? 'active' : ''}>QR</button>
        <button onClick={() => setActiveSubTab('AR')} className={activeSubTab === 'AR' ? 'active' : ''}>AR</button>
      </div>

      {/* 3. 장소 목록은 그대로 유지합니다. */}
      <div className="location-list">
        <ul>
          {treasures.map(treasure => (
            <li key={treasure.id} className={treasure.found ? 'found item-card' : 'item-card'}>
              <div className="item-icon">{treasure.icon}</div>
              <div className="item-content">
                <h4>{treasure.name} <span>{treasure.subtitle}</span></h4>
                <p>{treasure.description}</p>
                {treasure.found && <div className="found-check">✔️</div>}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .exploration-container {
          padding: 10px 0;
        }
        .content-display {
          margin-bottom: 16px;
        }
        .map-image-wrapper {
            height: 250px;
            border-radius: 12px;
            background-color: #e9ecef;
            overflow: hidden; /* 이미지가 둥근 모서리를 넘지 않도록 설정 */
            position: relative; /* layout="fill"을 위해 추가 */
        }
        /* .map-image-wrapper img 스타일은 Image 컴포넌트가 처리하므로 제거하거나 수정 불필요 */
        
        .qr-placeholder, .ar-placeholder {
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #333;
          border-radius: 12px;
          color: #fff;
        }
        .sub-nav {
          display: flex;
          background-color: #f0f2f5;
          border-radius: 8px;
          padding: 4px;
        }
        .sub-nav button {
          flex: 1;
          padding: 8px 12px;
          border: none;
          background-color: transparent;
          color: #555;
          font-weight: bold;
          cursor: pointer;
          border-radius: 6px;
          transition: background-color 0.3s, color 0.3s;
        }
        .sub-nav button.active {
          background-color: #fff;
          color: #007bff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .location-list {
          margin-top: 24px;
        }
        ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .item-card {
          display: flex;
          gap: 16px;
          background-color: #f8f9fa;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #e9ecef;
          position: relative;
        }
        .item-card.found {
          border-left: 5px solid #20c997;
        }
        .item-icon {
            font-size: 2.5rem;
            background-color: #e9ecef;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
        }
        .item-content h4 {
            font-weight: bold;
            margin-bottom: 4px;
        }
        .item-content h4 span {
            font-size: 0.8rem;
            color: #6c757d;
            font-weight: normal;
            margin-left: 8px;
        }
        .item-content p {
            font-size: 0.9rem;
            color: #495057;
        }
        .found-check {
            position: absolute;
            top: 16px;
            right: 16px;
            color: #20c997;
        }
      `}</style>
    </div>
  );
};

export default Exploration; 