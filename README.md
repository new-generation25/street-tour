# 봉황 메모리즈: 아버지의 타임캡슐

봉황동 지역을 배경으로 한 감성적인 스토리 기반 모바일 웹 애플리케이션입니다.  
아버지의 타임캡슐 속 5가지 소원을 따라가며 가족의 추억을 되새기는 인터랙티브 투어 앱입니다.

## 🎭 프로젝트 소개

**봉황 메모리즈**는 1988년 아버지가 딸을 위해 남긴 메모장을 발견한 강소영의 이야기를 따라가는 감성적인 현장 체험 프로그램입니다.

### 주요 미션
1. **봉황 1935** - 엄마와의 러브스토리 (풍선초 키링 만들기)
2. **미야상회** - 바나나우유의 약속 (목욕탕 다녀온 후 사오던 음식 찾기)
3. **능소화 고택** - 능소화 사진 (예쁜 사진 찍기)
4. **카페 탱자** - 아버지의 플레이리스트 (음악 듣고 편지 쓰기)
5. **방하림** - 가족오락관 (가족과 함께 게임하기)

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.x 이상
- pnpm (권장) 또는 npm, yarn, bun

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📦 기술 스택

- **프레임워크**: Next.js 15.3.5 (React 19.0.0)
- **언어**: TypeScript 5.x
- **스타일링**: Tailwind CSS 4.x
- **지도**: Naver Maps API
- **QR 스캔**: jsQR
- **패키지 매니저**: pnpm

## 🎯 주요 기능

- 📍 **인터랙티브 지도**: Naver Maps를 활용한 미션 위치 표시
- 📷 **QR 코드 스캔**: 카메라를 통한 미션 완료
- 🎮 **퀴즈 시스템**: 각 미션별 스토리 기반 퀴즈
- 📊 **진행률 추적**: localStorage를 통한 미션 완료 상태 저장
- 🎨 **반응형 디자인**: 모바일 최적화 (480px 최대 너비)

## 🔧 환경 설정

### Naver Maps API 설정
1. [Naver Cloud Platform](https://www.ncloud.com/)에서 Maps API 키 발급
2. `.env.local` 파일 생성:
```env
NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID=your_client_id
```

## 📚 추가 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Naver Maps API 문서](https://navermaps.github.io/maps.js.ncp/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)

## 🚢 배포

### Vercel 배포 (권장)
1. GitHub 저장소에 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 import
3. 환경 변수 설정
4. 자동 배포 완료

---

**개발자**: Max  
**버전**: 0.1.0
