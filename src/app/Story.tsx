"use client";
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

interface StoryProps {
  onNext: () => void;
}

const storyLines = [
  '안녕하세요, 저는 강소영입니다.',
  '이삿짐을 정리하다가 아버지의 낡은 메모장을 발견했어요.',
  '"아들과 함께 하고 싶은 것들"이라는 제목 아래 적힌 다섯 가지 약속.',
  '엄마와의 러브스토리, 목욕탕에서 때밀기, 예쁜 사진, 좋아하는 음악, 가족오락관 나가기.',
  '37년이 지났지만 하나도 하지 못한 채, 저는 고향을 떠났었죠.',
  '이제 아버지의 기억이 희미해지기 전에, 그 약속을 함께 완성하려고 합니다.',
  '타임캡슐 속 기록을 따라 봉황대길을 걸으며 아버지와의 시간을 되살려 주세요.',
];

const Story = ({ onNext }: StoryProps) => {
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const narrationRef = useRef<SpeechSynthesisUtterance | null>(null);
  const hasStartedNarrationRef = useRef(false);

  const typingSpeed = 35;
  const linePause = 650;

  useEffect(() => {
    setIsClient(true);
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (!isClient || currentLineIndex >= storyLines.length) {
      return;
    }

    const currentLine = storyLines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timer = window.setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => window.clearTimeout(timer);
    }

    const pauseTimer = window.setTimeout(() => {
      setCompletedLines((prev) => [...prev, currentLine]);
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
    }, linePause);

    return () => window.clearTimeout(pauseTimer);
  }, [currentCharIndex, currentLineIndex, isClient]);

  const allDisplayedLines = useMemo(() => {
    const activeLine = storyLines[currentLineIndex]?.slice(0, currentCharIndex) ?? '';
    return [...completedLines, activeLine].filter((line) => line.length > 0);
  }, [completedLines, currentCharIndex, currentLineIndex]);

  const selectVoice = (voices: SpeechSynthesisVoice[]) => {
    const koreanVoices = voices.filter((voice) => voice.lang.startsWith('ko'));
    const maleVoice = koreanVoices.find((voice) => /male|남성|man|guy/i.test(voice.name));
    if (maleVoice) return maleVoice;
    if (koreanVoices.length > 0) return koreanVoices[0];
    return voices[0] ?? null;
  };

  const startNarration = useCallback(() => {
    if (!isClient || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    
    // 이미 재생 중이면 중지
    window.speechSynthesis.cancel();
    
    const narrationText = storyLines.join(' ');
    const utterance = new SpeechSynthesisUtterance(narrationText);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = selectVoice(voices);
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    utterance.lang = 'ko-KR';
    utterance.rate = 0.95; // 50대 남성의 느긋한 톤
    utterance.pitch = 0.9;

    // TTS 완료 시 상태 초기화
    utterance.onend = () => {
      setIsNarrating(false);
      narrationRef.current = null;
    };

    // TTS 오류 시 상태 초기화
    utterance.onerror = () => {
      setIsNarrating(false);
      narrationRef.current = null;
    };

    window.speechSynthesis.speak(utterance);
    narrationRef.current = utterance;
    setIsNarrating(true);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    
    // TTS가 이미 시작되었으면 다시 시작하지 않음
    if (hasStartedNarrationRef.current) return;
    
    const handleVoicesChanged = () => {
      // voiceschanged 이벤트는 여러 번 발생할 수 있으므로, 한 번만 실행되도록 체크
      if (!hasStartedNarrationRef.current) {
        hasStartedNarrationRef.current = true;
        startNarration();
      }
    };
    
    // voices가 이미 로드되어 있으면 바로 시작
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      hasStartedNarrationRef.current = true;
      startNarration();
    } else {
      // voices가 아직 로드되지 않았으면 이벤트 대기
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    }

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      // 컴포넌트 언마운트 시 TTS 중지
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      narrationRef.current = null;
      setIsNarrating(false);
    };
  }, [isClient, startNarration]); // startNarration을 의존성에 추가

  return (
    <div className="story-container">
      <div className="story-hero">
        <Image 
          src="/bonghwang-memories.png" 
          alt="아버지의 타임캡슐 메모장" 
          width={480} 
          height={320}
          priority
          className="hero-image"
        />
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p>아버지와의 미완성 약속을 따라가는 골목 투어</p>
        </div>
      </div>

      <div className="memo-wrapper">
        <div className="memo-paper">
          <h2>아버지의 타임캡슐</h2>
          <div className="typed-lines">
            {allDisplayedLines.map((line, index) => (
              <p key={line + index} className="typed-line">
                {line}
                {index === allDisplayedLines.length - 1 && currentLineIndex < storyLines.length && (
                  <span className="cursor">|</span>
                )}
              </p>
            ))}
          </div>
          <div className="memo-actions">
            <button className="outline-button" onClick={startNarration}>
              나레이션 다시 듣기
            </button>
            <button className="primary-button" onClick={onNext}>
              다음으로
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .story-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 0 16px 24px;
        }
        .story-hero {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(10%) sepia(12%);
          transform: scale(1.02);
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.75) 90%);
        }
        .hero-copy {
          position: absolute;
          bottom: 18px;
          left: 16px;
          right: 16px;
          color: #f8f5ec;
          font-weight: 600;
          letter-spacing: 0.2px;
          text-shadow: 0 2px 6px rgba(0,0,0,0.45);
        }
        .memo-wrapper {
          display: flex;
          justify-content: center;
        }
        .memo-paper {
          width: 100%;
          max-width: 460px;
          background: linear-gradient(180deg, #f9f2df 0%, #f4e7c3 100%);
          border: 1px solid #c9bca2;
          border-radius: 12px;
          padding: 20px;
          box-shadow:
            0 6px 18px rgba(0,0,0,0.12),
            inset 0 1px 0 rgba(255,255,255,0.7);
          position: relative;
          overflow: hidden;
        }
        .memo-paper::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 100% 32px;
          pointer-events: none;
          opacity: 0.6;
        }
        .memo-paper h2 {
          text-align: center;
          margin: 0 0 12px 0;
          font-size: 1.25rem;
          color: #2f2414;
        }
        .typed-lines {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-family: 'Courier New', monospace;
          color: #2f2414;
          position: relative;
          z-index: 1;
          min-height: 160px;
        }
        .typed-line {
          margin: 0;
          line-height: 1.6;
        }
        .cursor {
          display: inline-block;
          margin-left: 4px;
          color: #7a4c2a;
          animation: blink 1s steps(2, start) infinite;
        }
        .memo-actions {
          display: flex;
          gap: 8px;
          margin-top: 16px;
          justify-content: flex-end;
          position: relative;
          z-index: 1;
        }
        .outline-button, .primary-button {
          border: none;
          border-radius: 10px;
          padding: 12px 16px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .outline-button {
          background: #fdf7ea;
          border: 1px solid #c9bca2;
          color: #6b5335;
        }
        .primary-button {
          background: linear-gradient(135deg, #f8b500, #ff7a00);
          color: #1d0f04;
          box-shadow: 0 8px 16px rgba(255, 122, 0, 0.28);
        }
        .outline-button:hover, .primary-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 14px rgba(0,0,0,0.08);
        }
        .outline-button:active, .primary-button:active {
          transform: translateY(0);
          box-shadow: none;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Story;