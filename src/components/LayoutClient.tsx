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

      {/* 글로벌 컬러 변수 주입 */}
      <style jsx global>{`
        :root {
          --primary: #F29F05; /* amber / 주요 포인트 */
          --primary-dark: #8C3926; /* 진한 브라운 */
          --primary-light: #D9C2AD; /* 베이지 */

          --secondary: #9CBF50; /* 연두-그린 */
          --secondary-dark: #BF4D34; /* 레드-브릭 */
          --secondary-light: #cfe5a6; /* 연한 그린 */
        }
      `}</style>
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