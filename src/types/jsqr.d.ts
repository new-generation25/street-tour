declare module 'jsqr' {
  interface QRCode {
    data: string;
    binaryData: Uint8ClampedArray;
    location: any;
  }

  export default function jsQR(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    options?: { inversionAttempts?: 'dontInvert' | 'onlyInvert' | 'attemptBoth' | 'invertFirst' }
  ): QRCode | null;
} 