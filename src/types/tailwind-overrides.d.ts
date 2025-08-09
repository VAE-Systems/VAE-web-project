// Tailwind internal type noise suppression
// We deliberately declare minimal module shapes to silence editor TS errors
// originating from Tailwind's internal dynamic properties that are not typed.

declare module 'tailwindcss/lib/lib/content' {
  export const resolveChangedContent: any
  export const resolvedChangedContent: any
  export const parseCandidateFiles: any
}

declare module 'tailwindcss/lib/lib/load-config' {
  export const loadConfig: any
}

declare module 'tailwindcss/lib/lib/setupContextUtils' {
  export const getContext: any
  export const getFileModifiedMap: any
}
