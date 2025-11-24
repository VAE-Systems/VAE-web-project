import React, { Suspense, lazy } from 'react'
import LoadingSpinner from './LoadingSpinner'

// Lazy load heavy components
const NeuralNetworkBackground = lazy(() => import('@/components/sections/effects/NeuralNetworkBackground'))

const TechStackSection = lazy(() => import('@/components/sections/content/TechStackSection'))

const ProductVaeCorePage = lazy(() => import('@/components/pages/ProductVaeCorePage'))

/**
 * Lazy-loaded Neural Network Background with loading fallback
 */
export const LazyNeuralNetworkBackground: React.FC<any> = props => (
  <Suspense fallback={<div className="bg-bg-primary absolute inset-0" />}>
    <NeuralNetworkBackground {...props} />
  </Suspense>
)

/**
 * Lazy-loaded Tech Stack Section with loading spinner
 */
export const LazyTechStackSection: React.FC<any> = props => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    }
  >
    <TechStackSection {...props} />
  </Suspense>
)

/**
 * Lazy-loaded Product VAE Core Page
 */
export const LazyProductVaeCorePage: React.FC<any> = props => (
  <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    }
  >
    <ProductVaeCorePage {...props} />
  </Suspense>
)
