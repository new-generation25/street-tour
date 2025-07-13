"use client";

import Script from 'next/script';
import { useScriptLoad } from '@/context/ScriptLoadContext';

export default function LayoutClient({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const { setIsLoaded } = useScriptLoad();

  return (
    <body className={className}>
      {children}
      <Script
        strategy="beforeInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
    </body>
  );
} 