import React, { Suspense, lazy } from 'react'
import LoadingSpinner from './LoadingSpinner'

// Lazy load heavy components
const NeuralNetworkBackground = lazy(() =>
  import('../sections/NeuralNetworkBackground')
)

const TechStackSection = lazy(() =>
  import('../sections/TechStackSection')
)

const ProductVaeCorePage = lazy(() =>
  import('../pages/ProductVaeCorePage')
)

/**
 * Lazy-loaded Neural Network Background with loading fallback
 */
export const LazyNeuralNetworkBackground: React.FC<any> = (props) => (
  <Suspense fallback={<div className="absolute inset-0 bg-bg-primary" />}>
    <NeuralNetworkBackground {...props} />
  </Suspense>
)

/**
 * Lazy-loaded Tech Stack Section with loading spinner
 */
export const LazyTechStackSection: React.FC<any> = (props) => (
  <Suspense fallback={
    <div className="flex items-center justify-center py-20">
      <LoadingSpinner size="lg" />
    </div>
  }>
    <TechStackSection {...props} />
  </Suspense>
)

/**
 * Lazy-loaded Product VAE Core Page
 */
export const LazyProductVaeCorePage: React.FC<any> = (props) => (
  <Suspense fallback={
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner size="lg" />
    </div>
  }>
    <ProductVaeCorePage {...props} />
  </Suspense>
)
