# 유학원도우미 — 설정 가이드

## 파일 구성

| 파일 | 역할 |
|------|------|
| `firebase-config.js` | Firebase 설정 **(반드시 수정)** |
| `auth.html` | 로그인 / 회원가입 / 승인 대기 |
| `admin.html` | 슈퍼관리자: 학원 DB + 회원 승인/거절 |
| `dashboard.html` | 회원(유학원) 대시보드 |
| `calculator.html` | 학비 계산기 (Firebase 연동) |
| `compare.html` | 인쇄용 비교표 (회원 브랜딩 포함) |
| `firestore.rules` | Firestore 보안 규칙 |
| `_shared.js` | 공통 유틸리티 |

---

## 단계별 설정

### 1. Firebase 프로젝트 생성
1. [console.firebase.google.com](https://console.firebase.google.com) → **프로젝트 만들기**
2. 웹 앱 추가 → `firebaseConfig` 복사 → `firebase-config.js`에 붙여넣기

### 2. Firebase Authentication 설정
- Authentication → 시작하기 → **이메일/비밀번호** 사용 설정
- 내 관리자 계정 직접 추가 (이메일/비밀번호)

### 3. Firestore 설정
- Firestore Database → 데이터베이스 만들기 → **프로덕션 모드** → 서울(asia-northeast3)
- **규칙 탭** → `firestore.rules` 내용 전체 붙여넣기 → 게시

### 4. 최초 슈퍼관리자 등록

Firestore → 데이터 탭에서 수동으로 문서 생성:

```
컬렉션: config
문서 ID: admins
필드: uids (배열) → 내 Firebase Auth UID 추가
```

또는 `firebase-config.js`의 `INITIAL_ADMIN_UIDS`에 UID 추가:
```js
const INITIAL_ADMIN_UIDS = ["your-uid-here"];
```

UID 확인: Authentication → 사용자 탭에서 복사

### 5. 기존 엑셀 데이터 이전
- 이전 버전의 `seed.html` 사용 (firebase-config.js만 교체하면 호환됨)

---

## 사용 흐름

```
[유학원] auth.html 가입 신청
              ↓
[관리자] admin.html → 회원 탭 → 승인
              ↓
[유학원] dashboard.html 접속
    → 브랜딩 설정 (로고, 컬러, 담당자)
    → calculator.html 에서 학비 계산
    → 비교 + → compare.html 열기
    → 인쇄 (유학원 브랜딩 포함)
```

---

## Firestore 데이터 구조

```
config/admins
  └── uids: string[]

members/{uid}
  ├── email, companyName, slogan
  ├── consultantName, consultantPhone
  ├── primaryColor, logoUrl
  └── status: "pending" | "approved" | "rejected"

schools/{school_code}
  ├── school_name, admission_fee_krw
  ├── courses: [{course_name, price_1w, price_2w, price_3w, price_per_week_4p}]
  ├── dorms:   [{dorm_name, price_1w, price_2w, price_3w, price_per_week_4p}]
  ├── local_fees: {ssp, ecard, visa_ext, student_id, admin_fee, pickup, textbook, deposit}
  └── discount_rules: {admission_discount, longterm_rules[], regdate_rules[], startdate_rules[]}

quotes/{quoteId}
  ├── memberId, createdAt
  └── compares: [견적 데이터]
```

---

## 배포

### 로컬 테스트
VS Code Live Server 또는:
```bash
npx serve .
```

### Firebase Hosting
```bash
npm i -g firebase-tools
firebase login
firebase init hosting  # Public directory: . (현재 폴더)
firebase deploy
```
