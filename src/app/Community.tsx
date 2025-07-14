"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import QrScanner from '@/components/QrScanner';

const Community = () => {
  const [showQrScanner, setShowQrScanner] = useState(false);

  // 베스트 포토 데이터
  const bestPhoto = { 
    id: 1, 
    user: '탐험가123', 
    likes: 42, 
    image: '/toduki.png', 
    location: '봉황대 입구' 
  };

  // 갤러리 데이터 (3x5 = 15개)
  const galleryPhotos = Array.from({ length: 15 }, (_, i) => ({
    id: i + 2,
    user: `탐험가${i + 2}`,
    likes: Math.floor(Math.random() * 30) + 10,
    image: '/toduki.png',
    location: ['봉황대 입구', '메이즈러너 카페', '비밀의 정원', '봉황하숙', '미로 중심'][i % 5]
  }));

  const handleQrScan = (data: string) => {
    console.log('QR 스캔 성공:', data);
    setShowQrScanner(false);
    // 여기에 AR 포토 로직 추가 가능
  };

  const handleQrError = (error: unknown) => {
    console.error('QR 스캔 오류:', error);
  };

  if (showQrScanner) {
    return (
      <div className="qr-scanner-container">
        <div className="scanner-header">
          <h3>📱 AR 포토 카메라</h3>
          <button 
            className="close-scanner"
            onClick={() => setShowQrScanner(false)}
          >
            ✕
          </button>
        </div>
        <QrScanner onScan={handleQrScan} onError={handleQrError} />
        <div className="scanner-footer">
          <p>QR 코드를 스캔하여 토더기와 함께 사진을 찍어보세요!</p>
        </div>
        
        <style jsx>{`
          .qr-scanner-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #000;
            z-index: 1000;
            display: flex;
            flex-direction: column;
          }
          .scanner-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
          }
          .scanner-header h3 {
            margin: 0;
            font-size: 1.2rem;
          }
          .close-scanner {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
          }
          .scanner-footer {
            padding: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            text-align: center;
          }
          .scanner-footer p {
            margin: 0;
            font-size: 0.9rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="community-container">
      {/* 헤더 */}
      <div className="community-header">
        <h2>📷 우리들의 탐험 일지</h2>
        <p>함께 나누는 특별한 모험 이야기</p>
      </div>

      {/* AR 포토존 */}
      <div className="ar-section">
        <div className="ar-card">
          <div className="ar-content">
            <div className="toduki-icon">
              <Image 
                src="/toduki.png" 
                alt="토더기" 
                width={60} 
                height={60}
                style={{ borderRadius: '50%' }}
              />
            </div>
            <div className="ar-text">
              <h3>토더기와 함께 사진찍기</h3>
              <p>QR 코드를 스캔해서 토더기와 함께 AR 사진을 찍어보세요!</p>
            </div>
          </div>
          <button 
            className="ar-button"
            onClick={() => setShowQrScanner(true)}
          >
            📱 AR 카메라 실행
          </button>
        </div>
      </div>

      {/* 베스트 포토 */}
      <div className="best-section">
        <div className="section-header">
          <h3>👑 이주의 베스트 포토</h3>
        </div>
        <div className="best-card">
          <div className="best-badge">🏆 BEST</div>
          <div className="best-photo">
            <Image 
              src={bestPhoto.image} 
              alt="베스트 포토"
              width={120}
              height={120}
              style={{ objectFit: 'cover', borderRadius: '12px' }}
            />
          </div>
          <div className="best-info">
            <div className="best-user">🎖️ {bestPhoto.user}</div>
            <div className="best-location">📍 {bestPhoto.location}</div>
            <div className="best-likes">❤️ {bestPhoto.likes}개의 좋아요</div>
          </div>
        </div>
      </div>

      {/* 탐험 갤러리 */}
      <div className="gallery-section">
        <div className="section-header">
          <h3>🖼️ 탐험 갤러리</h3>
          <p>다른 탐험가들의 모험 사진</p>
        </div>
        <div className="photo-grid">
          {galleryPhotos.map(photo => (
            <div key={photo.id} className="photo-item">
              <div className="photo-placeholder">
                <Image 
                  src={photo.image} 
                  alt={`${photo.user}의 사진`}
                  width={80}
                  height={80}
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
              <div className="photo-meta">
                <div className="photo-user">👤 {photo.user}</div>
                <div className="photo-likes">❤️ {photo.likes}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .community-container {
          padding: 10px 16px 80px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .community-header {
          text-align: center;
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
        
        /* AR 섹션 */
        .ar-card {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 16px;
          padding: 20px;
          color: white;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ar-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ar-text h3 {
          font-size: 1.2rem;
          margin: 0 0 8px 0;
        }
        .ar-text p {
          font-size: 0.9rem;
          margin: 0;
          opacity: 0.9;
        }
        .ar-button {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          border-radius: 12px;
          padding: 14px 20px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ar-button:hover {
          background: rgba(255,255,255,0.3);
          transform: translateY(-2px);
        }
        
        /* 베스트 포토 섹션 */
        .section-header {
          text-align: center;
          margin-bottom: 16px;
        }
        .section-header h3 {
          font-size: 1.4rem;
          font-weight: bold;
          color: #343a40;
          margin-bottom: 4px;
        }
        .section-header p {
          font-size: 0.9rem;
          color: #6c757d;
          margin: 0;
        }
        .best-card {
          background: linear-gradient(135deg, #fff5f5, #fef7cd);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .best-badge {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #8b5a00;
          padding: 6px 16px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.8rem;
        }
        .best-photo {
          margin: 16px 0;
        }
        .best-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .best-user {
          font-weight: bold;
          color: #343a40;
        }
        .best-location {
          color: #2563eb;
          font-size: 0.9rem;
        }
        .best-likes {
          color: #e74c3c;
          font-weight: bold;
          font-size: 0.9rem;
        }
        
        /* 갤러리 섹션 */
        .photo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .photo-item {
          background: #fff;
          border-radius: 12px;
          padding: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: center;
        }
        .photo-placeholder {
          width: 100%;
          margin-bottom: 8px;
          display: flex;
          justify-content: center;
        }
        .photo-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .photo-user {
          font-size: 0.75rem;
          color: #2563eb;
          font-weight: 500;
        }
        .photo-likes {
          font-size: 0.7rem;
          color: #e74c3c;
        }
      `}</style>
    </div>
  );
};

export default Community; 