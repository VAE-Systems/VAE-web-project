export const Motion = {
  ease: 'power3.out',
  easeInOut: 'power2.inOut',
  enter: 0.8,
  fade: 0.6,
  long: 2.0,
  stagger: 0.06,
} as const

export type MotionKeys = keyof typeof Motion

