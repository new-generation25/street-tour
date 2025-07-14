"use client";

import React, { useState, useRef, useEffect } from 'react';
import jsQR from 'jsqr';

interface QrScannerComponentProps {
  onScan: (data: string) => void;
  onError: (error: unknown) => void;
}

const QrScannerComponent = ({ onScan, onError }: QrScannerComponentProps) => {
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
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
    } catch (error: any) {
      console.error('카메라 접근 오류:', error);
      // 후면 카메라가 없거나 실패한 경우, 기본(전면) 카메라로 한 번 더 시도
      if (error?.name === 'NotReadableError' || error?.name === 'OverconstrainedError' || error?.name === 'NotFoundError') {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            await videoRef.current.play();
            setStream(mediaStream);
            setIsScannerActive(true);
            scanIntervalRef.current = setInterval(scanQRCode, 500);
            return;
          }
        } catch (fallbackError) {
          console.error('QR Scanner Error (fallback):', fallbackError);
          onError(fallbackError);
        }
      }
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

    // jsQR 라이브러리를 사용해 QR 코드 디코딩
    const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'attemptBoth',
    });

    if (qrCode) {
      onScan(qrCode.data);
      stopCamera();
    }
  };

  // 수동 입력 기능 제거됨

  useEffect(() => {
    // 컴포넌트 마운트 시 자동으로 카메라 실행
    startCamera();
    
    // 컴포넌트 언마운트 시 확실히 카메라 정리
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
          console.log('카메라 트랙 정리됨:', track.label);
        });
      }
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
      setStream(null);
      setIsScannerActive(false);
    };
  }, []);

  // 스트림이 변경될 때도 정리
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // 버튼 제거 후 스캐너 UI만 표시
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
          background: linear-gradient(45deg, var(--primary), var(--secondary));
          color: white;
        }
        @keyframes pulse {
          0% { border-color: #fff; }
          50% { border-color: var(--primary); }
          100% { border-color: #fff; }
        }
      `}</style>
    </div>
  );
};

export default QrScannerComponent; 