/**
 * Application Constants
 *
 * Centralized constants for maintainability and consistency
 */

export const BUSINESS_INFO = {
  EMAIL: 'info@vae.systems',
  DOMAIN: 'vae-systems.com',
  NAME: 'VAE Systems',
} as const

export const PRICING = {
  OPEN_SOURCE: {
    PRICE: '€0',
    PERIOD: 'für immer',
  },
  MANAGED_PRO: {
    PRICE: '€149',
    PERIOD: '/Monat',
    TOKENS_INCLUDED: '5M',
    EXTRA_TOKEN_COST: '€0.50 / 100k',
  },
  CONSULTING_STARTER: {
    PRICE: 'ab €990',
    PERIOD: '',
  },
  IMPLEMENTATION_PACKAGE: {
    PRICE: 'ab €4.900',
    PERIOD: '',
  },
} as const

export const PERCENTAGES = {
  COST_REDUCTION_LICENSE: '65%',
  EFFICIENCY_GAIN_AVERAGE: '60%',
  SETUP_TIME_REDUCTION: '70%',
  MARGIN_INCREASE: '40-60%',
  TOTAL_COST_REDUCTION: '30-60%',
  DATA_TRANSPARENCY: '100%',
  MULTI_TENANT_CODE_REDUCTION: '90%',
  LAUNCH_SPEED_INCREASE: '60%',
  DEVELOPMENT_COST_SAVINGS: '20%',
  ENABLEMENT_FOCUS: '100%',
} as const

export const TIME_ESTIMATES = {
  MVP_IMPLEMENTATION: '3–8 Wochen',
  DECISION_CYCLE_IMPROVEMENT: '4–6x',
  PARALLEL_PROJECTS: '5+',
} as const

export const FEATURES = {
  TEAM_SEATS: '3',
  SLA: '99.5%',
} as const

export const TOKEN_LIMITS = {
  INCLUDED: '5M',
  EXTRA_COST_PER_100K: '€0.50',
} as const
