/**
 * _shared.js — 공통 유틸리티
 * 각 HTML 파일에서 <script src="_shared.js"> 로 로드
 */

/* ── 숫자 포맷 ── */
const fmt   = n => Math.round(Number(n)||0).toLocaleString("en-US");
const toNum = v => { const s=String(v??"").trim().replace(/\D/g,""); const n=Number(s); return Number.isFinite(n)?n:0; };

/* ── 브랜딩 CSS 적용 ── */
function applyBranding(member) {
  if (!member) return;
  const root = document.documentElement;
  if (member.primaryColor) {
    root.style.setProperty("--color-primary", member.primaryColor);
    // 연한 버전 자동 생성
    root.style.setProperty("--color-primary-light", member.primaryColor + "18");
  }
}

/* ── 토스트 알림 ── */
function showToast(msg, type = "success") {
  let el = document.getElementById("_toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "_toast";
    el.style.cssText = "position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 20px;border-radius:12px;font-weight:600;font-size:.88rem;color:#fff;box-shadow:0 4px 20px rgba(0,0,0,.25);transition:opacity .3s;max-width:320px;";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.background = type === "success" ? "#16a34a" : type === "error" ? "#dc2626" : "#2563eb";
  el.style.opacity = "1"; el.style.display = "block";
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.opacity = "0"; setTimeout(() => el.style.display = "none", 300); }, 3000);
}

/* ── 날짜 포맷 ── */
function fmtDate(ts) {
  if (!ts) return "-";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("ko-KR", { year:"numeric", month:"2-digit", day:"2-digit" });
}
