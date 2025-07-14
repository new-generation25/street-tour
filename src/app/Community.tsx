"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const Community = () => {
  const [activeTab, setActiveTab] = useState('AR포토존');

  // 샘플 데이터
  const samplePhotos = [
    { id: 1, user: '탐험가123', likes: 42, image: '/toduki.png', location: '봉황대 입구' },
    { id: 2, user: '모험러버', likes: 38, image: '/toduki.png', location: '메이즈러너 카페' },
    { id: 3, user: '보물헌터', likes: 35, image: '/toduki.png', location: '비밀의 정원' },
    { id: 4, user: '짹짹이', likes: 29, image: '/toduki.png', location: '봉황하숙' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'AR포토존':
        return (
          <div className="ar-photo-zone">
            <div className="feature-card">
              <div className="feature-header">
                <span className="feature-icon">📸</span>
                <h3>토더기와 함께 사진찍기</h3>
              </div>
              <p>보물을 찾거나 특별한 포토존에서 토더기 AR 캐릭터를 소환하여 함께 사진을 찍어보세요!</p>
              <div className="toduki-preview">
                <Image 
                  src="/toduki.png" 
                  alt="토더기 캐릭터" 
                  width={120} 
                  height={120}
                  style={{ borderRadius: '50%' }}
                />
                <p>토더기가 당신의 모험을 함께합니다!</p>
              </div>
              <button className="ar-button">
                📱 AR 카메라 실행하기
              </button>
            </div>
          </div>
        );
      
      case '탐험갤러리':
        return (
          <div className="gallery-section">
            <div className="gallery-header">
              <h3>🖼️ 탐험 갤러리</h3>
              <p>다른 탐험가들의 모험 사진을 구경해보세요!</p>
            </div>
            <div className="photo-grid">
              {samplePhotos.map(photo => (
                <div key={photo.id} className="photo-card">
                  <div className="photo-wrapper">
                    <Image 
                      src={photo.image} 
                      alt={`${photo.user}의 사진`}
                      width={150}
                      height={150}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="photo-info">
                    <div className="photo-user">👤 {photo.user}</div>
                    <div className="photo-location">📍 {photo.location}</div>
                    <div className="photo-likes">
                      <button className="like-button">❤️ {photo.likes}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="upload-button">
              📷 내 사진 업로드하기
            </button>
          </div>
        );
      
      case '베스트포토':
        return (
          <div className="best-photo-section">
            <div className="crown-header">
              <span className="crown">👑</span>
              <h3>이주의 베스트 포토</h3>
              <p>가장 많은 사랑을 받은 이주의 베스트 사진입니다!</p>
            </div>
            <div className="winner-card">
              <div className="winner-badge">🏆 BEST PHOTO</div>
              <div className="winner-photo">
                <Image 
                  src="/toduki.png" 
                  alt="베스트 포토"
                  width={200}
                  height={200}
                  style={{ objectFit: 'cover', borderRadius: '12px' }}
                />
              </div>
              <div className="winner-info">
                <div className="winner-user">🎖️ 탐험가123</div>
                <div className="winner-location">📍 봉황대 입구</div>
                <div className="winner-likes">❤️ 42개의 좋아요</div>
                <div className="winner-prize">🎁 커피 쿠폰 증정!</div>
              </div>
            </div>
            <div className="ranking-list">
              <h4>🥈 이주의 Top 3</h4>
              {samplePhotos.slice(1, 4).map((photo, index) => (
                <div key={photo.id} className="ranking-item">
                  <span className="rank">#{index + 2}</span>
                  <Image 
                    src={photo.image} 
                    alt={`${photo.user}의 사진`}
                    width={60}
                    height={60}
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div className="ranking-info">
                    <div>👤 {photo.user}</div>
                    <div>❤️ {photo.likes}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="community-container">
      <div className="community-header">
        <h2>👥 우리들의 탐험 일지</h2>
        <p>함께 나누는 특별한 모험 이야기</p>
      </div>

      <div className="tab-navigation">
        {['AR포토존', '탐험갤러리', '베스트포토'].map(tab => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {renderContent()}
      </div>

      <style jsx>{`
        .community-container {
          padding: 10px 0 80px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .community-header {
          text-align: center;
          padding: 0 16px;
        }
        .community-header h2 {
          font-size: 1.8rem;
          font-weight: bold;
          color: #343a40;
          margin-bottom: 8px;
        }
        .community-header p {
          font-size: 0.9rem;
          color: #6c757d;
        }
        .tab-navigation {
          display: flex;
          gap: 8px;
          padding: 0 16px;
        }
        .tab-button {
          flex: 1;
          padding: 12px 8px;
          border: none;
          background-color: transparent;
          color: #495057;
          font-weight: bold;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s;
          font-size: 0.9rem;
        }
        .tab-button.active {
          background-color: var(--tab-purple);
          color: #fff;
          box-shadow: 0 2px 8px rgba(132, 94, 247, 0.3);
        }
        .tab-content {
          padding: 0 16px;
        }
        .feature-card {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
          text-align: center;
        }
        .feature-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .feature-icon {
          font-size: 2rem;
        }
        .feature-header h3 {
          font-size: 1.3rem;
          font-weight: bold;
          color: #343a40;
          margin: 0;
        }
        .toduki-preview {
          margin: 24px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .toduki-preview p {
          color: #6c757d;
          font-style: italic;
        }
        .ar-button {
          background: linear-gradient(135deg, var(--tab-purple), #a855f7);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 16px 24px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .ar-button:hover {
          transform: scale(1.05);
        }
        .gallery-header {
          text-align: center;
          margin-bottom: 24px;
        }
        .gallery-header h3 {
          font-size: 1.4rem;
          font-weight: bold;
          color: #343a40;
          margin-bottom: 8px;
        }
        .photo-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .photo-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .photo-wrapper {
          width: 100%;
          height: 150px;
          position: relative;
          overflow: hidden;
        }
        .photo-info {
          padding: 12px;
        }
        .photo-user {
          font-weight: bold;
          color: #343a40;
          font-size: 0.9rem;
          margin-bottom: 4px;
        }
        .photo-location {
          color: #6c757d;
          font-size: 0.8rem;
          margin-bottom: 8px;
        }
        .like-button {
          background: none;
          border: none;
          color: #e74c3c;
          cursor: pointer;
          font-size: 0.9rem;
        }
        .upload-button {
          width: 100%;
          background: linear-gradient(135deg, var(--start-btn-yellow), var(--start-btn-orange));
          color: white;
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
        }
        .crown-header {
          text-align: center;
          margin-bottom: 24px;
        }
        .crown {
          font-size: 3rem;
          display: block;
          margin-bottom: 8px;
        }
        .crown-header h3 {
          font-size: 1.4rem;
          font-weight: bold;
          color: #343a40;
          margin-bottom: 8px;
        }
        .winner-card {
          background: linear-gradient(135deg, #fff5f5, #fef7cd);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          margin-bottom: 24px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }
        .winner-badge {
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #8b5a00;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.9rem;
          margin-bottom: 16px;
          display: inline-block;
        }
        .winner-photo {
          margin: 16px 0;
        }
        .winner-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .winner-user {
          font-weight: bold;
          font-size: 1.1rem;
          color: #343a40;
        }
        .winner-location {
          color: #6c757d;
        }
        .winner-likes {
          color: #e74c3c;
          font-weight: bold;
        }
        .winner-prize {
          background: #d4edda;
          color: #155724;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: bold;
          margin-top: 8px;
        }
        .ranking-list h4 {
          color: #343a40;
          margin-bottom: 16px;
          text-align: center;
        }
        .ranking-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fff;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }
        .rank {
          font-weight: bold;
          color: var(--tab-purple);
          min-width: 30px;
        }
        .ranking-info {
          flex: 1;
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default Community; 