/**
 * Design Tokens
 *
 * Centralized design values for CSS maintainability
 */

export const DESIGN_TOKENS = {
  // Opacity values
  OPACITY: {
    GLASS: 0.03,
    GLASS_STRONG: 0.06,
    SURFACE_OVERLAY: 0.18,
    GRID_OVERLAY: 0.03,
    DIAGONAL_OVERLAY: 0.015,
    TECH_SPOTLIGHT: 0.22,
    MAGNETIC_GLOW: 0.35,
    BUTTON_SHADOW: 0.35,
    BUTTON_HOVER_SHADOW: 0.45,
    BUTTON_HOVER_RING: 0.35,
  } as const,

  // Border radius
  RADIUS: {
    SM: '0.375rem',
    BASE: '0.5rem',
    LG: '0.75rem',
    XL: '1rem',
    '2XL': '1.5rem',
  } as const,

  // Spacing scale
  SPACING: {
    XS: '0.25rem',
    SM: '0.5rem',
    BASE: '1rem',
    LG: '1.5rem',
    XL: '2rem',
    '2XL': '3rem',
    '3XL': '4rem',
    '4XL': '6rem',
    '5XL': '8rem',
  } as const,

  // Font sizes
  FONT_SIZE: {
    XS: '0.875rem',
    SM: '1rem',
    BASE: '1.125rem',
    LG: '1.25rem',
    XL: '1.375rem',
    '2XL': '1.625rem',
    '3XL': '2rem',
    '4XL': '2.375rem',
    '5XL': '3.125rem',
    '6XL': '3.875rem',
  } as const,

  // Z-index scale
  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
  } as const,

  // Box shadows
  SHADOW: {
    GLOW: '0 0 20px hsla(var(--color-vae-turquoise), 0.3)',
    GLOW_STRONG: '0 0 30px hsla(var(--color-vae-turquoise), 0.5)',
    TURQUOISE: '0 8px 32px hsla(var(--color-vae-turquoise), 0.3)',
    TURQUOISE_GLOW: '0 0 40px hsla(var(--color-vae-turquoise), 0.5)',
    BUTTON: '0 6px 18px -6px rgba(var(--vae-turquoise-rgb), 0.35)',
    BUTTON_HOVER: '0 10px 28px -10px rgba(var(--vae-turquoise-rgb), 0.45)',
  } as const,

  // Gradients
  GRADIENT: {
    SURFACE_1: 'linear-gradient(to bottom right, hsl(var(--color-bg-darker)) 0%, hsl(var(--color-bg-dark)) 100%)',
    SURFACE_2: 'linear-gradient(135deg, hsl(var(--color-bg-dark)) 0%, hsl(var(--color-bg-secondary)) 100%)',
    SURFACE_3:
      'radial-gradient(circle at 25% 30%, hsla(var(--color-vae-turquoise), 0.10), transparent 65%), linear-gradient(160deg, hsl(var(--color-bg-darker)) 0%, hsl(var(--color-bg-dark)) 100%)',
    SURFACE_4:
      'linear-gradient(120deg, hsl(var(--color-bg-darker)) 0%, hsl(var(--color-bg-darker)) 40%, hsl(var(--color-bg-secondary)) 100%)',
    SURFACE_5:
      'radial-gradient(circle at 70% 60%, hsla(var(--color-vae-turquoise), 0.10), transparent 70%), linear-gradient(145deg, hsl(var(--color-bg-dark)) 0%, hsl(var(--color-bg-secondary)) 100%)',
    BUTTON_PRIMARY:
      'linear-gradient(135deg, hsl(var(--color-vae-turquoise) / 0.96), hsl(var(--color-vae-turquoise) / 0.88))',
  } as const,
} as const
