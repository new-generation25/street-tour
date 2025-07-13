declare module 'react-qr-scanner' {
  import * as React from 'react';

  interface QrScannerProps {
    delay?: number | boolean;
    onError: (err: unknown) => void;
    onScan: (data: { text: string } | null) => void;
    style?: React.CSSProperties;
    facingMode?: 'user' | 'environment';
  }

  const QrScanner: React.FC<QrScannerProps>;

  export default QrScanner;
} 