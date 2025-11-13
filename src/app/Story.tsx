"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface StoryProps {
  onStart: () => void;
}

const Story = ({ onStart }: StoryProps) => {
  const [isRequestingPermissions, setIsRequestingPermissions] = useState(false);

  const handleStartClick = async () => {
    setIsRequestingPermissions(true);
    
    try {
      // 위치정보 권한 요청
      if ("geolocation" in navigator) {
        await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log('위치정보 권한 허용됨:', position.coords);
              resolve(position);
            },
            (error) => {
              console.warn('위치정보 권한 거부되거나 사용할 수 없음:', error);
              resolve(null); // 위치 정보가 없어도 계속 진행
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 60000
            }
          );
        });
      }

      // 카메라 권한 요청 (짧게 테스트하고 바로 종료)
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false,
        });
        console.log('카메라 권한 허용됨');
        // 즉시 스트림 종료
        stream.getTracks().forEach(track => track.stop());
      } catch (cameraError) {
        console.warn('카메라 권한 거부되거나 사용할 수 없음:', cameraError);
        // 카메라가 없어도 앱은 계속 사용 가능
      }

      // 권한 요청 완료 후 탐험 시작
      onStart();
    } catch (error) {
      console.error('권한 요청 중 오류:', error);
      // 오류가 있어도 앱은 시작
      onStart();
    } finally {
      setIsRequestingPermissions(false);
    }
  };
  return (
    <div className="story-container">
      <div className="story-content">
        <div className="main-image-wrapper">
          <Image 
            src="/jjack-story.png" 
            alt="아버지의 타임캡슐 메모장" 
            width={400} 
            height={400}
            priority // 우선적으로 로드
          />
        </div>
        <div className="story-box">
          <h2>아버지의 타임캡슐</h2>
          <p>
            안녕하세요, 저는 강소영이라고 합니다.
            <br />
            이삿짐을 정리하다가 우연히 발견한 메모장이 있어요.
          </p>
          <p>
            "아들과 함께 하고 싶은 것들" 1988년 9월 17일, 제가 태어난 날 아버지가 쓰신 거예요.
            <br />
            1. 엄마와의 러브스토리 들려주기
            <br />
            2. 목욕탕에서 같이 때밀기
            <br />
            3. 예쁜 사진 찍어주기
            <br />
            4. 내가 좋아하는 음악 함께 듣기
            <br />
            5. 가족오락관에 같이 나가기
          </p>
          <p>
            37년이 지났는데... 하나도 못 하셨어요.
            <br />
            왜냐면 제가 19년 전에 고향을 떠났거든요.
            <br />
            아버지가 무뚝뚝하다는 이유로.
          </p>
          <p>
            이번에 내려와 보니 아버지가 건망증이 많이 심해지셨어요.
            <br />
            하지만 1988년, 제가 태어났을 때 이야기만은 잊고싶지 않으신가 봐요.
            <br />
            이 메모장의 내용대로 따라가 보려고요.
            <br />
            오늘 여러분은 제 조력자예요. 아버지의 타임캡슐 속으로 같이 가주시겠어요?
          </p>
        </div>
      </div>
      <button 
        onClick={handleStartClick} 
        disabled={isRequestingPermissions}
        className="start-button"
      >
        {isRequestingPermissions ? '권한 요청 중...' : '탐험 시작하기'}
      </button>

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
          margin-bottom: 8px;
        }
        .main-image-wrapper {
          width: 100%;
          margin-bottom: 24px;
        }
        .story-box {
          background-color: var(--primary-light);
          border: 1px solid var(--primary-dark);
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
          color: var(--text-primary); /* 제목 색상 추가 */
        }
        p {
          line-height: 1.7; /* 줄 간격 조정 */
          margin-bottom: 1rem; /* 문단 사이 간격 추가 */
          color: var(--text-primary); /* 본문 텍스트 색상을 검정색으로 변경 */
        }
        p:last-child {
            margin-bottom: 0;
        }
        .start-button {
          background: linear-gradient(135deg, var(--start-btn-yellow), var(--start-btn-orange));
          color: var(--text-white);
          border: none;
          border-radius: 9999px;
          padding: 16px 32px;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s;
          margin: 8px 16px 0; /* 상하좌우 여백 추가 */
        }
        .start-button:hover:not(:disabled) {
          transform: scale(1.05);
        }
        .start-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
    </div>
  );
};

export default Story; 