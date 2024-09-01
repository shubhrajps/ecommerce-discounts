import React from 'react'
import { CartProvider } from './Context/CartContext'
import MainPage from './MainPage'

const MainApp = () => {
  return (
    <CartProvider>
        <MainPage />
    </CartProvider>
  )
}

export default MainApp;