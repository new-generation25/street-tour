"use client";

import React, { useState, useRef, useEffect } from 'react';

interface QrScannerComponentProps {
  onScan: (data: string) => void;
  onError: (error: unknown) => void;
}

const QrScannerComponent = ({ onScan, onError }: QrScannerComponentProps) => {
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCamera = async () => {
    // 사용자에게 명확한 허용 메시지를 먼저 표시
    const allowed = window.confirm('"봉황대길 골목투어"가 카메라를 사용하도록 허용하시겠습니까?');
    if (!allowed) {
      return; // 허용하지 않으면 아무 것도 하지 않음
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // 후면 카메라 사용
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // iOS Safari 및 일부 브라우저에서 자동 재생을 확실히 하기 위해 play() 호출
        try {
          await videoRef.current.play();
        } catch (playError) {
          console.warn('비디오 자동 재생 실패:', playError);
        }
        setStream(mediaStream);
        setIsScannerActive(true);
        
        // QR 코드 스캔 시작
        scanIntervalRef.current = setInterval(scanQRCode, 500);
      }
    } catch (error) {
      console.error('카메라 접근 오류:', error);
      onError(error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setIsScannerActive(false);
  };

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx || video.readyState !== video.HAVE_ENOUGH_DATA) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // 간단한 QR 코드 패턴 감지 (실제 구현에서는 더 정교한 라이브러리 사용)
    // 여기서는 임시로 사용자 입력을 받는 방식으로 구현
  };

  const handleManualInput = () => {
    const input = prompt('QR 코드 값을 입력하세요 (테스트용):');
    if (input) {
      onScan(input);
      stopCamera();
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  if (!isScannerActive) {
    return (
      <div className="scanner-prompt">
        <button onClick={startCamera} className="scan-button">
          📷 QR 코드 스캔하기
        </button>
        <button onClick={handleManualInput} className="manual-button">
          ⌨️ 수동 입력 (테스트용)
        </button>
        
        <style jsx>{`
          .scanner-prompt {
            display: flex;
            flex-direction: column;
            gap: 16px;
            justify-content: center;
            align-items: center;
            height: 300px;
            padding: 20px;
          }
          .scan-button {
            padding: 16px 32px;
            font-size: 1.1rem;
            border-radius: 12px;
            border: none;
            background: linear-gradient(45deg, #845ef7, #7c3aed);
            color: white;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(132, 94, 247, 0.3);
            transition: all 0.3s ease;
          }
          .scan-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(132, 94, 247, 0.4);
          }
          .manual-button {
            padding: 12px 24px;
            font-size: 0.9rem;
            border-radius: 8px;
            border: 2px solid #845ef7;
            background: transparent;
            color: #845ef7;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
          }
          .manual-button:hover {
            background: #845ef7;
            color: white;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="scanner-container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="scanner-video"
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      <div className="scanner-overlay">
        <div className="scan-frame"></div>
        <p className="scan-instruction">QR 코드를 화면 중앙에 맞춰주세요</p>
        <button onClick={stopCamera} className="stop-button">
          ❌ 스캔 중지
        </button>
        <button onClick={handleManualInput} className="manual-button">
          ⌨️ 수동 입력
        </button>
      </div>

      <style jsx>{`
        .scanner-container {
          position: relative;
          width: 100%;
          height: 400px;
          background: #000;
          border-radius: 12px;
          overflow: hidden;
        }
        .scanner-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .scanner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.3);
        }
        .scan-frame {
          width: 200px;
          height: 200px;
          border: 3px solid #fff;
          border-radius: 12px;
          box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
          animation: pulse 2s infinite;
        }
        .scan-instruction {
          color: white;
          font-size: 0.9rem;
          margin: 16px 0;
          text-align: center;
          background: rgba(0, 0, 0, 0.7);
          padding: 8px 16px;
          border-radius: 20px;
        }
        .stop-button, .manual-button {
          margin: 4px;
          padding: 8px 16px;
          border: none;
          border-radius: 20px;
          font-size: 0.8rem;
          cursor: pointer;
          font-weight: bold;
        }
        .stop-button {
          background: #ff4757;
          color: white;
        }
        .manual-button {
          background: #845ef7;
          color: white;
        }
        @keyframes pulse {
          0% { border-color: #fff; }
          50% { border-color: #845ef7; }
          100% { border-color: #fff; }
        }
      `}</style>
    </div>
  );
};

export default QrScannerComponent; 