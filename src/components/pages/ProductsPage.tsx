import React from 'react'
import ProductsSection from '../sections/ProductsSection'
import ProductsHeroSection from '../sections/ProductsHeroSection'

const ProductsPage: React.FC = () => {
  return (
  <div className="min-h-screen">
      <ProductsHeroSection />
      <ProductsSection />
    </div>
  )
}

export default ProductsPage
