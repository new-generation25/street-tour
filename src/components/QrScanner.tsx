"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// QrScanner를 클라이언트 측에서만 렌더링하도록 동적 로딩
const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

interface QrScannerComponentProps {
  onScan: (data: string) => void;
  onError: (error: any) => void;
}

const QrScannerComponent = ({ onScan, onError }: QrScannerComponentProps) => {
  const [isScannerActive, setIsScannerActive] = useState(false);

  const handleScan = (data: any) => {
    if (data) {
      onScan(data.text);
      setIsScannerActive(false); // 스캔 성공 시 스캐너 비활성화
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    onError(err);
    setIsScannerActive(false);
  };

  if (!isScannerActive) {
    return (
      <div className="scanner-prompt">
        <button onClick={() => setIsScannerActive(true)}>
          QR 코드 스캔하기
        </button>
        <style jsx>{`
          .scanner-prompt {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
          }
          button {
            padding: 12px 24px;
            font-size: 1rem;
            border-radius: 8px;
            border: none;
            background-color: #845ef7;
            color: white;
            cursor: pointer;
            font-weight: bold;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p style={{ textAlign: 'center', marginTop: '10px' }}>QR 코드를 화면에 맞춰주세요.</p>
    </div>
  );
};

export default QrScannerComponent; 