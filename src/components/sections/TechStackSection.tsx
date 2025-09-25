import React, { useEffect, useRef, useState } from 'react'
import { ParallaxBackdrop, ParticleField } from './BackgroundEffects'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Motion } from '@/utils/motion'

const techStack = [
  {
    name: 'TensorFlow',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    website: 'https://tensorflow.org',
  },
  {
    name: 'PyTorch',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    website: 'https://pytorch.org',
  },
  {
    name: 'OpenAI',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
    website: 'https://openai.com',
  },
  { name: 'LangChain', logo: 'https://python.langchain.com/img/brand/wordmark.png', website: 'https://langchain.com' },
  {
    name: 'Claude Sonnet',
    logo: 'https://avatars.githubusercontent.com/u/121681234?s=200&v=4',
    website: 'https://anthropic.com',
  },
  {
    name: 'ChatGPT',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    website: 'https://chat.openai.com',
  },
  {
    name: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    website: 'https://python.org',
  },
  {
    name: 'JavaScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    website: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    name: 'Node.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    website: 'https://nodejs.org',
  },
  {
    name: 'FastAPI',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    website: 'https://fastapi.tiangolo.com',
  },
  {
    name: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    website: 'https://react.dev',
  },
  {
    name: 'TypeScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    website: 'https://typescriptlang.org',
  },
  {
    name: 'PostgreSQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    website: 'https://postgresql.org',
  },
  {
    name: 'MongoDB',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    website: 'https://mongodb.com',
  },
  {
    name: 'Docker',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    website: 'https://docker.com',
  },
  {
    name: 'Kubernetes',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    website: 'https://kubernetes.io',
  },
  {
    name: 'AWS',
    logo: 'https://e7.pngegg.com/pngimages/628/589/png-clipart-amazon-web-services-amazon-com-logo-plataform-computer-network-text.png',
    website: 'https://aws.amazon.com',
  },
  {
    name: 'Temporal',
    logo: 'https://images.ctfassets.net/0uuz8ydxyd9p/2W8B7bcLSPX9YaSwkfrhmv/eade3fc61520b8cee84cf8605dce3056/Temporal_Symbol_dark_1_2x.png',
    website: 'https://temporal.io',
  },
  { name: 'Pinecone', logo: 'https://www.pinecone.io/images/pinecone-logo.svg', website: 'https://pinecone.io' },
  {
    name: 'Supabase',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
    website: 'https://supabase.com',
  },
  {
    name: 'Corteza',
    logo: 'https://cortezaproject.org/wp-content/uploads/2024/10/Corteza-logo-340-300x138.png',
    website: 'https://cortezaproject.org',
  },
] as const

/**
 * TechStackSection Component
 *
 * Features:
 * - GSAP animations with ScrollTrigger
 * - Animated cables/connections
 * - Radial background effect
 * - Interactive hover animations
 * - VAE design system integration
 */
const TechStackSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const logoRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const cableRefs = useRef<SVGPathElement[]>([])
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const small = window.matchMedia('(max-width: 768px)').matches

      if (reduced || small) {
        gsap.set([headingRef.current, subRef.current, logoRefs.current], { opacity: 1, y: 0 })
        gsap.set('.radial-bg', { opacity: 1, scale: 1 })
        gsap.set(cableRefs.current, { opacity: 0.3, strokeDashoffset: 0 })
        return
      }

      if (!sectionRef.current) return

      const trig = { trigger: sectionRef.current, start: 'top 80%' }

      gsap.fromTo(
        '.radial-bg',
        { scale: 0, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: Motion.long, ease: Motion.ease, scrollTrigger: trig }
      )

      cableRefs.current.forEach((path, i) => {
        if (!path) return
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 3,
          ease: Motion.ease,
          delay: i * 0.05,
          scrollTrigger: trig,
        })
        gsap.to(path, {
          opacity: 0.6,
          repeat: -1,
          yoyo: true,
          duration: 2.5,
          ease: 'sine.inOut',
          delay: 3 + i * 0.05,
          scrollTrigger: trig,
        })
      })

      // Text animations mit scrub
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 60,
          filter: 'blur(20px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 1,
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        subRef.current,
        {
          opacity: 0,
          y: 40,
          filter: 'blur(15px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: subRef.current,
            start: 'top 90%',
            end: 'top 75%',
            scrub: 1.2,
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Logo Animationen – vereinfachte enter animation (ohne scrub für Performance)
      logoRefs.current.forEach((el, i) => {
        if (!el) return
        const angle = (i * 30 * Math.PI) / 180
        const radius = 200 + (i % 5) * 40
        const x = radius * Math.cos(angle)
        const y = radius * Math.sin(angle)
        gsap.fromTo(
          el,
          { x, y, opacity: 0, scale: 0.85 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: Motion.enter,
            ease: Motion.ease,
            delay: i * Motion.stagger,
            scrollTrigger: trig,
          }
        )
        const imgEl = el.querySelector('img')
        if (imgEl) {
          // Keine Rotation initial – Ruhe im Idle
          gsap.set(imgEl, { rotationY: 0 })
        }

        // Hover Interaktion: Sofort hell (<=200ms), langsames Ausfaden (~1.2s)
        // Re-Enter während Ausfaden: direkt wieder hochfahren (Keyboard-Trail Effekt)
        const handleEnter = () => {
          // Kill Ausblendung, Glow hochfahren über Variable
          ;(el as any)._fadeOutTween?.kill?.()
          gsap.to(el, { '--glow-alpha': 0.78, scale: 1.085, duration: 0.25, ease: 'power2.out' })
          const img = el.querySelector('img') as HTMLElement | null
          if (img) {
            // Laufender Spin nur während Hover
            ;(img as any)._spinTween?.kill?.()
            ;(img as any)._spinTween = gsap.to(img, {
              rotationY: '+=360',
              duration: 1.4,
              ease: 'power1.inOut',
              repeat: -1,
            })
          }
        }
        const handleLeave = () => {
          // Spin auslaufen lassen (sanft abbremsen)
          const img = el.querySelector('img') as HTMLElement | null
          if (img) {
            const currentRot = gsap.getProperty(img, 'rotationY') as number
            ;(img as any)._spinTween?.kill?.()
            // Zur nächsten vollen 360 Grad einrasten
            const target = Math.ceil(currentRot / 360) * 360
            gsap.to(img, { rotationY: target, duration: 0.8, ease: 'power2.out' })
          }
          // Sehr langsames Ausblenden des Glows (Trail Effekt)
          const fade = gsap.to(el, { '--glow-alpha': 0, scale: 1, duration: 3.2, ease: 'power2.out' })
          ;(el as any)._fadeOutTween = fade
        }
        el.addEventListener('pointerenter', handleEnter)
        el.addEventListener('pointerleave', handleLeave)

        // 3D tilt effect (only update CSS variables to avoid clobbering GSAP / hover transforms)
        // Leichtes Throttling (rAF) für effizienteren Tilt
        let ticking = false
        const handleMove = (e: MouseEvent) => {
          if (ticking) return
          ticking = true
          requestAnimationFrame(() => {
            const rect = el.getBoundingClientRect()
            const xRel = (e.clientX - rect.left) / rect.width
            const yRel = (e.clientY - rect.top) / rect.height
            const rotX = (0.5 - yRel) * 14 // etwas reduziert für Ruhe
            const rotY = (xRel - 0.5) * 14
            el.style.setProperty('--rx', rotX + 'deg')
            el.style.setProperty('--ry', rotY + 'deg')
            ticking = false
          })
        }
        const resetTilt = () => {
          el.style.setProperty('--rx', '0deg')
          el.style.setProperty('--ry', '0deg')
        }
        el.addEventListener('mousemove', handleMove)
        el.addEventListener('mouseleave', resetTilt)

        // cleanup
        return () => {
          el.removeEventListener('pointerenter', handleEnter)
          el.removeEventListener('pointerleave', handleLeave)
          el.removeEventListener('mousemove', handleMove)
          el.removeEventListener('mouseleave', resetTilt)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Spotlight tracking & activation gating (IntersectionObserver)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setActive(entry.isIntersecting)
        })
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handlePointer = (e: React.PointerEvent) => {
    if (!spotlightRef.current) return
    const rect = spotlightRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    spotlightRef.current.style.setProperty('--spot-x', `${x}%`)
    spotlightRef.current.style.setProperty('--spot-y', `${y}%`)
  }

  return (
    <section
      id="tech-stack"
      className={
        'surface-alt overlay-grid overlay-diag edge-glow-top tech-stack-interactive relative overflow-hidden border-t border-vae-turquoise/10 py-24 md:py-32 ' +
        (active ? 'tech-stack-active' : '')
      }
      ref={sectionRef}
      // Only bind pointer movement on devices that support fine pointer input
      onPointerMove={!window.matchMedia('(pointer: coarse)').matches ? handlePointer : undefined}
    >
      <ParallaxBackdrop strength={8} />
      <ParticleField count={22} />
      {/* Radial Background */}
      <div className="radial-bg absolute inset-0 -z-20 scale-0 bg-[radial-gradient(circle_at_center,hsla(var(--color-vae-turquoise),0.2),transparent_70%)] opacity-0" />

      {/* Animated Cables */}
      <svg className="absolute inset-0 -z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          ref={el => {
            if (el) cableRefs.current.push(el)
          }}
          d="M50 50 C60 40,80 30,90 10"
          style={{
            stroke: 'hsla(var(--color-vae-turquoise), 0.3)',
            strokeWidth: '1.5',
            fill: 'none',
            opacity: 0,
          }}
        />
        <path
          ref={el => {
            if (el) cableRefs.current.push(el)
          }}
          d="M50 50 C55 60,70 80,90 90"
          style={{
            stroke: 'hsla(var(--color-vae-turquoise), 0.3)',
            strokeWidth: '1.5',
            fill: 'none',
            opacity: 0,
          }}
        />
        <path
          ref={el => {
            if (el) cableRefs.current.push(el)
          }}
          d="M50 50 C40 60,20 80,10 90"
          style={{
            stroke: 'hsla(var(--color-vae-turquoise), 0.3)',
            strokeWidth: '1.5',
            fill: 'none',
            opacity: 0,
          }}
        />
        <path
          ref={el => {
            if (el) cableRefs.current.push(el)
          }}
          d="M50 50 C40 40,20 30,10 10"
          style={{
            stroke: 'hsla(var(--color-vae-turquoise), 0.3)',
            strokeWidth: '1.5',
            fill: 'none',
            opacity: 0,
          }}
        />
        <path
          ref={el => {
            if (el) cableRefs.current.push(el)
          }}
          d="M50 50 C50 30,50 10,50 0"
          style={{
            stroke: 'hsla(var(--color-vae-turquoise), 0.3)',
            strokeWidth: '1.5',
            fill: 'none',
            opacity: 0,
          }}
        />
        <path
          ref={el => {
            if (el) cableRefs.current.push(el)
          }}
          d="M50 50 C60 50,80 50,100 50"
          style={{
            stroke: 'hsla(var(--color-vae-turquoise), 0.3)',
            strokeWidth: '1.5',
            fill: 'none',
            opacity: 0,
          }}
        />
      </svg>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <h2 ref={headingRef} className="h2 heading-gradient h-space mb-3">
            Unser Technologie-Fundament
          </h2>
          <p ref={subRef} className="mx-auto max-w-2xl text-xl text-text-secondary">
            Open Source, bewährte Frameworks und deutsche Ingenieurskunst.
          </p>
        </div>

        {/* Tech Grid */}
        <div ref={spotlightRef} className="tech-spotlight">
          <div
            className="tech-stack-grid mx-auto grid max-w-5xl gap-8"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            }}
          >
            {techStack.map((tech, i) => (
              <a
                key={tech.name}
                href={tech.website}
                target="_blank"
                rel="noopener noreferrer"
                className="tech-tile flex flex-col items-center justify-center gap-3 p-4 text-center will-change-transform"
                ref={el => {
                  logoRefs.current[i] = el
                }}
              >
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="h-12 w-12 object-contain will-change-transform"
                  loading="lazy"
                  decoding="async"
                />
                <span className="text-sm font-medium text-text-light">{tech.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechStackSection
