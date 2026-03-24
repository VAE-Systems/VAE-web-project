/**
 * VaeIllustrations — Mini-SVG-Grafiken für Pain Points, Process, Services
 * CSS-animiert, GPU-composited, kein JS-Loop.
 */

import React from 'react'

const CSS = `
@keyframes billGrow { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(1.18); } }
@keyframes lockBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
@keyframes eyeBlink { 0%,90%,100% { transform: scaleY(1); } 95% { transform: scaleY(0.1); } }
@keyframes tagPulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
@keyframes checkDraw { from { stroke-dashoffset: 30; } to { stroke-dashoffset: 0; } }
@keyframes serverBlink { 0%,100%{opacity:1;} 50%{opacity:0.25;} }
@keyframes gearSpin { to { transform: rotate(360deg); } }
@keyframes dataFlow { 0%{transform:translateX(0);opacity:0.8;} 100%{transform:translateX(28px);opacity:0;} }
@keyframes shieldPop { 0%{transform:scale(0.85);opacity:0.4;} 100%{transform:scale(1);opacity:1;} }
`

// ─── 1. PREIS-ESKALATION: Wachsende Rechnung ─────────────────────────────────
export const BillGrowIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <>
    <style>{CSS}</style>
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      {/* Dokument */}
      <rect
        x="10"
        y="8"
        width="36"
        height="44"
        rx="3"
        fill="currentColor"
        opacity="0.08"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      {/* Linien */}
      <rect x="16" y="16" width="20" height="2.5" rx="1" fill="currentColor" opacity="0.25" />
      <rect x="16" y="22" width="14" height="2" rx="1" fill="currentColor" opacity="0.18" />
      {/* Betrag — wächst */}
      <rect
        x="16"
        y="30"
        width="24"
        height="8"
        rx="2"
        fill="#ef4444"
        opacity="0.15"
        style={{ transformOrigin: '28px 38px', animation: 'billGrow 2s ease-in-out infinite' }}
      />
      <rect
        x="16"
        y="30"
        width="24"
        height="8"
        rx="2"
        fill="none"
        stroke="#ef4444"
        strokeWidth="1.2"
        style={{ transformOrigin: '28px 38px', animation: 'billGrow 2s ease-in-out infinite' }}
      />
      <text x="28" y="37" textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="bold" fontFamily="monospace">
        +↑
      </text>
      {/* Pfeil hoch */}
      <path
        d="M42 14 L42 8 M39 11 L42 8 L45 11"
        stroke="#ef4444"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  </>
)

// ─── 2. FREMDE DATEN: Auge + Server ──────────────────────────────────────────
export const EyeServerIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    {/* Server-Box */}
    <rect
      x="6"
      y="18"
      width="28"
      height="24"
      rx="3"
      fill="currentColor"
      opacity="0.08"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeOpacity="0.3"
    />
    <rect x="10" y="22" width="20" height="5" rx="2" fill="currentColor" opacity="0.15" />
    <circle
      cx="28"
      cy="24.5"
      r="2"
      fill="currentColor"
      opacity="0.4"
      style={{ animation: 'serverBlink 1.5s ease-in-out infinite' }}
    />
    <rect x="10" y="30" width="20" height="5" rx="2" fill="currentColor" opacity="0.12" />
    {/* Auge oben rechts */}
    <ellipse
      cx="42"
      cy="18"
      rx="9"
      ry="6"
      fill="none"
      stroke="#ef4444"
      strokeWidth="1.5"
      style={{ animation: 'eyeBlink 3s ease-in-out infinite' }}
    />
    <circle
      cx="42"
      cy="18"
      r="3"
      fill="#ef4444"
      opacity="0.7"
      style={{ animation: 'eyeBlink 3s ease-in-out infinite' }}
    />
    {/* Verbindungslinie */}
    <path d="M34 24 Q38 22 36 18" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    {/* Schloss-X */}
    <line
      x1="38"
      y1="34"
      x2="46"
      y2="42"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeOpacity="0.2"
      strokeLinecap="round"
    />
    <line
      x1="46"
      y1="34"
      x2="38"
      y2="42"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeOpacity="0.2"
      strokeLinecap="round"
    />
  </svg>
)

// ─── 3. DSGVO-RISIKO: Schild gebrochen ───────────────────────────────────────
export const BrokenShieldIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    {/* Schild links (Sie) */}
    <path d="M10 16 L10 30 Q10 40 20 44 L20 16 Z" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1.2" />
    {/* Schild rechts (Anbieter) */}
    <path
      d="M20 16 L20 44 Q30 40 30 30 L30 16 Z"
      fill="currentColor"
      opacity="0.08"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeOpacity="0.3"
    />
    {/* Riss */}
    <path
      d="M20 16 L18 24 L22 28 L18 44"
      stroke="#ef4444"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Label */}
    <text x="12" y="50" fill="#ef4444" fontSize="6" fontWeight="bold" opacity="0.7">
      Sie
    </text>
    <text x="21" y="50" fill="currentColor" fontSize="6" opacity="0.4">
      Anbieter
    </text>
    {/* Pfeil: Risiko fließt zu Sie */}
    <path
      d="M36 28 L44 28 M40 24 L44 28 L40 32"
      stroke="#ef4444"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.6"
    />
  </svg>
)

// ─── 4. KONFEKTIONS-ANZUG: Paket mit unnötigen Features ──────────────────────
export const OverpaidBoxIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    {/* Box */}
    <rect
      x="8"
      y="20"
      width="40"
      height="28"
      rx="3"
      fill="currentColor"
      opacity="0.08"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeOpacity="0.3"
    />
    {/* Deckel */}
    <rect
      x="8"
      y="14"
      width="40"
      height="8"
      rx="2"
      fill="currentColor"
      opacity="0.12"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeOpacity="0.3"
    />
    {/* Schleife */}
    <line x1="28" y1="14" x2="28" y2="48" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
    {/* Features-Tags — ein Tag ist gestrichen */}
    <rect x="13" y="26" width="12" height="6" rx="1" fill="#00d4aa" opacity="0.3" />
    <text x="19" y="31" textAnchor="middle" fill="currentColor" fontSize="5" opacity="0.8">
      ✓
    </text>
    <rect x="13" y="35" width="12" height="6" rx="1" fill="#ef4444" opacity="0.2" />
    <line x1="13" y1="38" x2="25" y2="38" stroke="#ef4444" strokeWidth="1.5" opacity="0.5" />
    <rect x="31" y="26" width="12" height="6" rx="1" fill="#ef4444" opacity="0.2" />
    <line x1="31" y1="29" x2="43" y2="29" stroke="#ef4444" strokeWidth="1.5" opacity="0.5" />
    <rect x="31" y="35" width="12" height="6" rx="1" fill="#ef4444" opacity="0.2" />
    <line x1="31" y1="38" x2="43" y2="38" stroke="#ef4444" strokeWidth="1.5" opacity="0.5" />
    {/* Preis-Tag */}
    <text
      x="28"
      y="52"
      textAnchor="middle"
      fill="#ef4444"
      fontSize="7"
      fontWeight="bold"
      opacity="0.6"
      style={{ animation: 'tagPulse 2s ease-in-out infinite' }}
    >
      80% weg
    </text>
  </svg>
)

// ─── 5. EINE PLATTFORM: Verbundene Nodes ─────────────────────────────────────
export const ConnectedPlatformIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    {/* Center Node */}
    <circle cx="28" cy="28" r="7" fill="#00d4aa" opacity="0.2" stroke="#00d4aa" strokeWidth="1.5" />
    {/* Satellite Nodes */}
    {[
      { cx: 14, cy: 14 },
      { cx: 42, cy: 14 },
      { cx: 14, cy: 42 },
      { cx: 42, cy: 42 },
    ].map((n, i) => (
      <g key={i}>
        <line
          x1="28"
          y1="28"
          x2={n.cx}
          y2={n.cy}
          stroke="#00d4aa"
          strokeWidth="1"
          strokeDasharray="3 2"
          opacity="0.4"
        />
        <circle cx={n.cx} cy={n.cy} r="5" fill="#00d4aa" opacity="0.15" stroke="#00d4aa" strokeWidth="1.2" />
      </g>
    ))}
    {/* Data flow particle */}
    <circle
      cx="21"
      cy="21"
      r="2"
      fill="#00d4aa"
      opacity="0.8"
      style={{ animation: 'dataFlow 1.8s ease-in-out infinite' }}
    />
  </svg>
)

// ─── 6. PLANBARE KOSTEN: Fixe Balken ─────────────────────────────────────────
export const FixedCostIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    {/* Achse */}
    <line x1="10" y1="44" x2="46" y2="44" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
    <line x1="10" y1="10" x2="10" y2="44" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
    {/* SaaS-Balken: wachsend, rot */}
    {[16, 22, 28, 32].map((h, i) => (
      <rect key={i} x={13 + i * 8} y={44 - h} width="5" height={h} rx="1" fill="#ef4444" opacity={0.2 + i * 0.08} />
    ))}
    {/* VAE-Linie: gerade, grün */}
    <line x1="10" y1="30" x2="46" y2="30" stroke="#00d4aa" strokeWidth="2" strokeDasharray="4 2" />
    <text x="14" y="28" fill="#00d4aa" fontSize="7" fontWeight="bold" opacity="0.8">
      fixe Kosten
    </text>
    <text x="38" y="20" fill="#ef4444" fontSize="7" opacity="0.6">
      ↗ SaaS
    </text>
  </svg>
)

// ─── 7. DEUTSCHLAND-SERVER ───────────────────────────────────────────────────
export const GermanyServerIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    {/* Server */}
    <rect
      x="14"
      y="20"
      width="28"
      height="22"
      rx="4"
      fill="currentColor"
      opacity="0.08"
      stroke="#00d4aa"
      strokeWidth="1.5"
    />
    <rect x="18" y="24" width="20" height="5" rx="2" fill="currentColor" opacity="0.12" />
    <circle
      cx="34"
      cy="26.5"
      r="2"
      fill="#00d4aa"
      opacity="0.7"
      style={{ animation: 'serverBlink 1.2s ease-in-out infinite' }}
    />
    <rect x="18" y="32" width="20" height="5" rx="2" fill="currentColor" opacity="0.1" />
    {/* DE-Flagge mini */}
    <rect x="22" y="8" width="12" height="4" rx="0" fill="#333" />
    <rect x="22" y="12" width="12" height="4" rx="0" fill="#dd0000" />
    <rect x="22" y="16" width="12" height="4" rx="0" fill="#ffcc00" />
    {/* Schloss */}
    <rect x="23" y="43" width="10" height="8" rx="2" fill="#00d4aa" opacity="0.2" stroke="#00d4aa" strokeWidth="1" />
    <path d="M26 43 V40 Q28 37 30 40 V43" stroke="#00d4aa" strokeWidth="1.2" fill="none" />
  </svg>
)

// ─── 8. KI OHNE API-KOSTEN ───────────────────────────────────────────────────
export const LocalAIIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    {/* Brain-outline */}
    <path
      d="M20 34 Q14 34 14 26 Q14 18 22 18 Q22 14 28 14 Q34 14 34 18 Q42 18 42 26 Q42 34 36 34 Z"
      fill="currentColor"
      opacity="0.08"
      stroke="#00d4aa"
      strokeWidth="1.5"
    />
    {/* Nodes im Brain */}
    {[
      { x: 22, y: 24 },
      { x: 28, y: 22 },
      { x: 34, y: 24 },
      { x: 25, y: 29 },
      { x: 31, y: 29 },
    ].map((n, i) => (
      <circle
        key={i}
        cx={n.x}
        cy={n.y}
        r="2.5"
        fill="#00d4aa"
        opacity="0.35"
        style={{ animation: `serverBlink ${1 + i * 0.3}s ease-in-out infinite ${i * 0.2}s` }}
      />
    ))}
    {/* Verbindungen */}
    <line x1="22" y1="24" x2="28" y2="22" stroke="#00d4aa" strokeWidth="0.8" opacity="0.3" />
    <line x1="28" y1="22" x2="34" y2="24" stroke="#00d4aa" strokeWidth="0.8" opacity="0.3" />
    <line x1="22" y1="24" x2="25" y2="29" stroke="#00d4aa" strokeWidth="0.8" opacity="0.3" />
    <line x1="34" y1="24" x2="31" y2="29" stroke="#00d4aa" strokeWidth="0.8" opacity="0.3" />
    {/* X für keine API-Kosten */}
    <circle cx="42" cy="40" r="8" fill="#0a1a14" />
    <line x1="38" y1="36" x2="46" y2="44" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
    <line x1="46" y1="36" x2="38" y2="44" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
    <text x="42" y="52" textAnchor="middle" fill="#ef4444" fontSize="6" fontWeight="bold">
      API $
    </text>
  </svg>
)

// ─── PROCESS ICONS ────────────────────────────────────────────────────────────
export const AnalyseIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    {/* Lupe */}
    <circle cx="24" cy="24" r="12" fill="none" stroke="#00d4aa" strokeWidth="2" />
    <circle cx="24" cy="24" r="7" fill="#00d4aa" opacity="0.1" />
    <line x1="33" y1="33" x2="44" y2="44" stroke="#00d4aa" strokeWidth="2.5" strokeLinecap="round" />
    {/* Balken innen */}
    <rect x="19" y="21" width="10" height="2" rx="1" fill="#00d4aa" opacity="0.6" />
    <rect x="19" y="25" width="7" height="2" rx="1" fill="#00d4aa" opacity="0.4" />
  </svg>
)

export const BuildIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    {/* Zahnrad */}
    <circle
      cx="22"
      cy="22"
      r="8"
      fill="none"
      stroke="#00d4aa"
      strokeWidth="2"
      style={{ transformOrigin: '22px 22px', animation: 'gearSpin 6s linear infinite' }}
    />
    <circle cx="22" cy="22" r="3" fill="#00d4aa" opacity="0.3" />
    {/* Checkmark */}
    <path
      d="M32 34 L38 42 L50 26"
      stroke="#00d4aa"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="30"
      strokeDashoffset="30"
      style={{ animation: 'checkDraw 1s 0.5s ease-out forwards' }}
    />
  </svg>
)

export const SupportIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    {/* Schild */}
    <path
      d="M28 10 L44 16 L44 28 Q44 40 28 46 Q12 40 12 28 L12 16 Z"
      fill="#00d4aa"
      opacity="0.08"
      stroke="#00d4aa"
      strokeWidth="1.5"
    />
    {/* Check */}
    <path
      d="M20 28 L25 34 L36 22"
      stroke="#00d4aa"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="30"
      strokeDashoffset="30"
      style={{ animation: 'checkDraw 1s ease-out forwards' }}
    />
    {/* Puls-Ring */}
    <circle
      cx="28"
      cy="28"
      r="18"
      fill="none"
      stroke="#00d4aa"
      strokeWidth="1"
      opacity="0.15"
      style={{ animation: 'tagPulse 2s ease-in-out infinite' }}
    />
  </svg>
)

// ─── SERVICE ICONS ────────────────────────────────────────────────────────────
export const BeratungIllustration: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    {/* Kompass */}
    <circle cx="32" cy="32" r="22" fill="none" stroke="#00d4aa" strokeWidth="1.5" opacity="0.3" />
    <circle cx="32" cy="32" r="15" fill="#00d4aa" opacity="0.06" />
    {/* Nadel */}
    <path d="M32 18 L35 32 L32 36 L29 32 Z" fill="#00d4aa" opacity="0.6" />
    <path d="M32 46 L29 32 L32 28 L35 32 Z" fill="currentColor" opacity="0.2" />
    {/* Markierungen */}
    <line x1="32" y1="12" x2="32" y2="16" stroke="#00d4aa" strokeWidth="1.5" opacity="0.5" />
    <line x1="32" y1="48" x2="32" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="12" y1="32" x2="16" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="48" y1="32" x2="52" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    {/* 3 Optionen Punkte */}
    <circle
      cx="22"
      cy="42"
      r="3"
      fill="currentColor"
      opacity="0.2"
      stroke="currentColor"
      strokeWidth="1"
      strokeOpacity="0.4"
    />
    <circle
      cx="32"
      cy="46"
      r="3"
      fill="currentColor"
      opacity="0.2"
      stroke="currentColor"
      strokeWidth="1"
      strokeOpacity="0.4"
    />
    <circle cx="42" cy="42" r="3" fill="#00d4aa" opacity="0.35" stroke="#00d4aa" strokeWidth="1" />
  </svg>
)

export const SetupIllustration: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    {/* Server-Stack */}
    {[0, 1, 2].map(i => (
      <g key={i}>
        <rect
          x="10"
          y={12 + i * 14}
          width="44"
          height="11"
          rx="3"
          fill="#00d4aa"
          opacity={0.06 + i * 0.03}
          stroke="#00d4aa"
          strokeWidth="1"
          strokeOpacity={0.3 + i * 0.1}
        />
        <circle
          cx="18"
          cy={17.5 + i * 14}
          r="3"
          fill="#00d4aa"
          style={{ animation: `serverBlink ${1 + i * 0.4}s ease-in-out infinite ${i * 0.3}s` }}
        />
        <rect x="25" y={15 + i * 14} width="22" height="2.5" rx="1" fill="currentColor" opacity="0.15" />
        <rect x="25" y={19 + i * 14} width="14" height="2" rx="1" fill="currentColor" opacity="0.1" />
      </g>
    ))}
    {/* Checkmark unten rechts */}
    <circle cx="48" cy="50" r="10" fill="#00d4aa" opacity="0.15" stroke="#00d4aa" strokeWidth="1.5" />
    <path
      d="M43 50 L47 54 L54 44"
      stroke="#00d4aa"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="20"
      strokeDashoffset="20"
      style={{ animation: 'checkDraw 0.8s 0.4s ease-out forwards' }}
    />
  </svg>
)

export const BetreuungIllustration: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    {/* Puls-Linie */}
    <path
      d="M8 36 L18 36 L22 24 L26 42 L30 30 L34 36 L56 36"
      stroke="#00d4aa"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.7"
    />
    {/* Schirm oben */}
    <path
      d="M32 10 L48 16 L48 26 Q48 36 32 42 Q16 36 16 26 L16 16 Z"
      fill="none"
      stroke="#00d4aa"
      strokeWidth="1.5"
      opacity="0.3"
    />
    {/* Puls dot */}
    <circle
      cx="34"
      cy="36"
      r="3"
      fill="#00d4aa"
      opacity="0.8"
      style={{ animation: 'tagPulse 1.2s ease-in-out infinite' }}
    />
    {/* Kündbar-Badge */}
    <rect x="14" y="48" width="36" height="10" rx="3" fill="#00d4aa" opacity="0.1" stroke="#00d4aa" strokeWidth="1" />
    <text x="32" y="56" textAnchor="middle" fill="#00d4aa" fontSize="7" fontWeight="bold" opacity="0.8">
      mtl. kündbar
    </text>
  </svg>
)
