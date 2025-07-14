"use client";

import Script from 'next/script';
import { useScriptLoad } from '@/context/ScriptLoadContext';
import { useEffect } from 'react';

export default function LayoutClient({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const { setIsLoaded } = useScriptLoad();

  // 서비스 워커 사용 안 함 (sw.js 제거로 인한 404 방지)
  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.register('/sw.js')
  //       .then((registration) => {
  //         console.log('SW registered: ', registration);
  //       })
  //       .catch((registrationError) => {
  //         console.log('SW registration failed: ', registrationError);
  //       });
  //   }
  // }, []);

  return (
    <body className={className}>
      {children}

      <Script
        strategy="afterInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
    </body>
  );
} 