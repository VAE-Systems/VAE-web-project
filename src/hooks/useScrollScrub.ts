import { RefObject } from 'react'
import { useScroll, useTransform, MotionValue } from 'framer-motion'

export interface ScrollScrubOptions {
  target: RefObject<HTMLElement>
  offset?: OffsetInput | [OffsetInput, OffsetInput]
}

type OffsetInput = string | number | [string | number, string | number]

export function useScrollScrub({ target, offset }: ScrollScrubOptions) {
  const resolvedOffset: [OffsetInput, OffsetInput] = Array.isArray(offset)
    ? (offset as [OffsetInput, OffsetInput])
    : [offset ?? 'start end', 'center center']

  const { scrollYProgress } = useScroll({ target, offset: resolvedOffset as any })
  // Default mappings: fade + translate Y
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.6], [0, 1, 1])
  const y = useTransform(scrollYProgress, [0, 0.6], [24, 0])
  return { scrollYProgress, opacity, y }
}

export type ScrollScrubReturn = {
  scrollYProgress: MotionValue<number>
  opacity: MotionValue<number>
  y: MotionValue<number>
}
