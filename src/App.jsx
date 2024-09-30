import { useState } from 'react'

import './App.css'
import { Routes ,Route} from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import View from './pages/View'
import Wishlist from './pages/Wishlist'
import Pnf from './pages/Pnf'
import Footer from './Components/Footer'


function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      {/* : is a path parameter of url */}
      <Route path='/:id/view' element={<View/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/*' element={<Pnf/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
