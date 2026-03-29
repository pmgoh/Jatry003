/**
 * ─── firebase-config.js ───────────────────────────────────
 *  Firebase 콘솔 → 프로젝트 설정 → 웹 앱에서 복사
 * ─────────────────────────────────────────────────────────
 */
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyA76-gkZxTjzEMqdTUzOsP_lc7EcE7_1QE",
  authDomain:        "jatry003.firebaseapp.com",
  projectId:         "jatry003",
  storageBucket:     "jatry003.firebasestorage.app",
  messagingSenderId: "847323304284",
  appId:             "1:847323304284:web:5b3b5f1cc61dc352d72b199",
  measurementId:     "G-8J8SNJKJB6"
};

/**
 * 최초 슈퍼관리자 UID 목록
 * Firebase Auth에서 계정 만든 뒤 UID 복사해서 여기 넣으세요.
 * 이후에는 admin.html → 관리자 탭에서 추가/제거 가능합니다.
 */
const INITIAL_ADMIN_UIDS = [
  // "UID_여기에_붙여넣기"
];
