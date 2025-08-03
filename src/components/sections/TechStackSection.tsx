import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const techStack = [
  { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', website: 'https://tensorflow.org' },
  { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', website: 'https://pytorch.org' },
  { name: 'OpenAI', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg', website: 'https://openai.com' },
  { name: 'LangChain', logo: 'https://python.langchain.com/img/brand/wordmark.png', website: 'https://langchain.com' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', website: 'https://python.org' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', website: 'https://nodejs.org' },
  { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', website: 'https://fastapi.tiangolo.com' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', website: 'https://react.dev' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', website: 'https://typescriptlang.org' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', website: 'https://postgresql.org' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', website: 'https://mongodb.com' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', website: 'https://docker.com' },
  { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', website: 'https://kubernetes.io' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', website: 'https://aws.amazon.com' },
  { name: 'Temporal', logo: 'https://temporal.io/logo-font-straight-dark.svg', website: 'https://temporal.io' },
  { name: 'Pinecone', logo: 'https://www.pinecone.io/images/pinecone-logo.svg', website: 'https://pinecone.io' }
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

      // Radial background animation
      gsap.fromTo(
        '.radial-bg',
        { scale: 0, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power2.out', scrollTrigger: trig }
      )

      // Cable animations
      cableRefs.current.forEach((path, i) => {
        if (!path) return
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 3,
          ease: 'power2.out',
          delay: i * 0.05,
          scrollTrigger: trig
        })
        gsap.to(path, {
          opacity: 0.6,
          repeat: -1,
          yoyo: true,
          duration: 2.5,
          ease: 'sine.inOut',
          delay: 3 + i * 0.05,
          scrollTrigger: trig
        })
      })

      // Heading animation
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        filter: 'blur(20px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: trig
      })

      // Subtitle animation
      gsap.from(subRef.current, {
        opacity: 0,
        y: 20,
        filter: 'blur(20px)',
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: trig
      })

      // Logo animations
      logoRefs.current.forEach((el, i) => {
        if (!el) return
        const angle = (i * 30 * Math.PI) / 180
        const radius = 200 + (i % 5) * 40
        const x = radius * Math.cos(angle)
        const y = radius * Math.sin(angle)
        
        gsap.fromTo(
          el,
          { x, y, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.2 + (i % 3) * 0.1,
            ease: 'power2.out',
            delay: i * 0.15,
            scrollTrigger: trig,
            onStart: () => {
              const img = el.querySelector('img')
              if (img) {
                gsap.fromTo(img, { rotationY: 0 }, { rotationY: 360, duration: 1, ease: 'power1.inOut' })
              }
            }
          }
        )

        // Hover animations
        const tl = gsap.timeline({ paused: true })
        tl.to(el, { 
          boxShadow: '0 0 20px rgba(0,255,165,0.6)', 
          duration: 0.3, 
          ease: 'power2.out' 
        }).to(el.querySelector('img'), { 
          rotationY: '+=360', 
          duration: 0.5, 
          ease: 'power1.inOut' 
        }, 0)

        el.addEventListener('mouseenter', () => {
          tl.play()
        })

        el.addEventListener('mouseleave', () => {
          tl.reverse()
          tl.eventCallback('onReverseComplete', () => {
            tl.pause(0)
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="tech-stack"
      className="relative py-24 bg-bg-dark overflow-hidden"
      ref={sectionRef}
    >
      {/* Radial Background */}
      <div 
        className="radial-bg absolute inset-0 opacity-0 scale-0 -z-20"
        style={{
          background: 'radial-gradient(circle at center, hsla(var(--vae-turquoise-hsl) / 0.2), transparent 70%)'
        }}
      />

      {/* Animated Cables */}
      <svg 
        className="absolute inset-0 -z-10"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <path
          ref={el => {
            if (el) cableRefs.current.push(el)
          }}
          d="M50 50 C60 40,80 30,90 10"
          className="stroke-vae-turquoise/30 stroke-[1.5] fill-none opacity-0"
        />
        <path
          ref={el => {
            if (el) cableRefs.current.push(el)
          }}
          d="M50 50 C55 60,70 80,90 90"
          className="stroke-vae-turquoise/30 stroke-[1.5] fill-none opacity-0"
        />
        <path
          ref={el => {
            if (el) cableRefs.current.push(el)
          }}
          d="M50 50 C40 60,20 80,10 90"
          className="stroke-vae-turquoise/30 stroke-[1.5] fill-none opacity-0"
        />
        <path
          ref={el => {
            if (el) cableRefs.current.push(el)
          }}
          d="M50 50 C40 40,20 30,10 10"
          className="stroke-vae-turquoise/30 stroke-[1.5] fill-none opacity-0"
        />
        <path
          ref={el => {
            if (el) cableRefs.current.push(el)
          }}
          d="M50 50 C50 30,50 10,50 0"
          className="stroke-vae-turquoise/30 stroke-[1.5] fill-none opacity-0"
        />
        <path
          ref={el => {
            if (el) cableRefs.current.push(el)
          }}
          d="M50 50 C60 50,80 50,100 50"
          className="stroke-vae-turquoise/30 stroke-[1.5] fill-none opacity-0"
        />
      </svg>

      <div className="container-vae">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h3 
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold mb-3 gradient-text-vae"
          >
            Unser Technologie-Fundament
          </h3>
          <p 
            ref={subRef}
            className="text-xl text-text-secondary max-w-2xl mx-auto"
          >
            Open Source, bewährte Frameworks und deutsche Ingenieurskunst.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 max-w-6xl mx-auto">
          {techStack.map((tech, i) => (
            <a
              key={tech.name}
              href={tech.website}
              target="_blank"
              rel="noopener noreferrer"
              className="tech-logo-item flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 hover:transform hover:-translate-y-1 hover:scale-105 group"
              ref={el => {
                logoRefs.current[i] = el
              }}
            >
              <img 
                src={tech.logo} 
                alt={tech.name}
                className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <span className="text-sm text-vae-white text-center font-medium">
                {tech.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStackSection