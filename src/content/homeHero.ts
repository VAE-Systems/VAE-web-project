export interface HeroSublineVariant {
  id: string
  text: string
}

export const heroSublineVariants: HeroSublineVariant[] = [
  {
    id: 'A',
    text: 'für souveräne deutsche Unternehmen.'
  },
  {
    id: 'B',
    text: 'für deutsche Unternehmen.'
  }
]

export const getHeroSubline = (id?: string): string => {
  return heroSublineVariants.find(v => v.id === id)?.text || heroSublineVariants[0].text
}
