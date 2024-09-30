import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProducts } from '../Redux/Slices/productSlice'


const Header = ({insidehome}) => {
  const myWishlist = useSelector(state=>state.wishlistReducer)
  const dispatch = useDispatch()
  const myCart = useSelector(state=>state.cartReducer)

  return (
    // <nav className='flex w-full bg-yellow-500 fixed top-0 p-5 items-center'>
    <nav className='flex w-full bg-yellow-500 fixed top-0 p-5 items-center'>
      <Link className='text-white font-bold' to={'/'}><i className=" fa-solid fa-truck-fast me-1"></i>E-cart</Link>
      <ul className='flex-1 text-right'>
        {
          insidehome &&
          <li className='list-none inline-block px-5'><input onChange={e=>dispatch(searchProducts(e.target.value.toLowerCase()))} style={{width:'300px'}} type="text" placeholder='search items here!' className='rounded p-1'/></li>
        }
        <li className='list-none inline-block px-5'><Link className='text-white font-semibold px-2' to={'/wishlist'}><i className="fa-solid fa-heart text-red-600 me-1"></i>Wishlist <span className='bg-black rounded p-1'>{myWishlist.length}</span></Link></li>
        <li className='list-none inline-block px-5'><Link className='text-white font-semibold px-2' to={'/cart'}><i className="fa-solid fa-cart-shopping text-green-600 me-1"></i>Cart <span className='bg-black rounded p-1'>{myCart.length}</span></Link></li>
      </ul>

    </nav>
  )
}

export default Header
