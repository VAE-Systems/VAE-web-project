/**
 * GeometricBackground — Light Mode Alternative zum Neural Network
 *
 * CSS-only vertikale Platten die sich verschieben, pausieren, weitergleiten.
 * Inspiriert von KFE's Balken-Stil. GPU-composited via transform/opacity.
 * Läuft flüssig auf schwachen Computern.
 */

import React from 'react'

const PANELS = [
  { delay: '0s', duration: '14s', width: '2px', left: '8%', opacity: 0.06, tall: true },
  { delay: '2s', duration: '18s', width: '1px', left: '16%', opacity: 0.04, tall: false },
  { delay: '0.5s', duration: '22s', width: '40px', left: '23%', opacity: 0.025, tall: true },
  { delay: '4s', duration: '16s', width: '1px', left: '33%', opacity: 0.05, tall: false },
  { delay: '1s', duration: '20s', width: '3px', left: '42%', opacity: 0.07, tall: true },
  { delay: '6s', duration: '24s', width: '60px', left: '52%', opacity: 0.02, tall: false },
  { delay: '3s', duration: '17s', width: '1px', left: '61%', opacity: 0.045, tall: true },
  { delay: '0.8s', duration: '21s', width: '2px', left: '70%', opacity: 0.06, tall: false },
  { delay: '5s', duration: '19s', width: '28px', left: '78%', opacity: 0.03, tall: true },
  { delay: '2.5s', duration: '15s', width: '1px', left: '87%', opacity: 0.05, tall: false },
]

const CSS = `
@keyframes panelSlide {
  0%   { transform: translateY(0%);    }
  35%  { transform: translateY(-8%);   }
  50%  { transform: translateY(-8%);   }
  85%  { transform: translateY(-18%);  }
  100% { transform: translateY(-18%);  }
}
@keyframes panelSlideAlt {
  0%   { transform: translateY(0%);    }
  40%  { transform: translateY(-12%);  }
  55%  { transform: translateY(-12%);  }
  90%  { transform: translateY(-6%);   }
  100% { transform: translateY(-6%);   }
}
@keyframes panelFade {
  0%, 100% { opacity: var(--p-opacity); }
  50%       { opacity: calc(var(--p-opacity) * 1.8); }
}
`

const GeometricBackground: React.FC = () => (
  <>
    <style>{CSS}</style>
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PANELS.map((p, i) => (
        <div
          key={i}
          className="absolute bottom-[-20%] top-[-20%]"
          style={{
            left: p.left,
            width: p.width,
            ['--p-opacity' as string]: p.opacity,
            opacity: p.opacity,
            background: 'currentColor',
            animation: [
              `${i % 2 === 0 ? 'panelSlide' : 'panelSlideAlt'} ${p.duration} ${p.delay} ease-in-out infinite alternate`,
              `panelFade ${parseFloat(p.duration) * 0.7}s ${p.delay} ease-in-out infinite`,
            ].join(', '),
            height: p.tall ? '130%' : '90%',
          }}
        />
      ))}

      {/* Horizontale Akzent-Linie oben */}
      <div className="absolute left-0 right-0 top-[28%] h-px opacity-[0.06]" style={{ background: 'currentColor' }} />
      {/* Horizontale Akzent-Linie Mitte */}
      <div className="absolute left-0 right-0 top-[62%] h-px opacity-[0.04]" style={{ background: 'currentColor' }} />
    </div>
  </>
)

export default GeometricBackground
