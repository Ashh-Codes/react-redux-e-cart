import React from 'react'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlistItem } from '../Redux/Slices/wishlistSlice'
import { addToCart } from '../Redux/Slices/cartSlice'



const Wishlist = () => {
  const myWishlist = useSelector(state=>state.wishlistReducer)
  const dispatch = useDispatch()
  const myCart  = useSelector(state=>state.cartReducer)

  const handleAddToCart =(product)=>{
    const existstingProduct =  myCart?.find(item=>item.id==product.id)
    if(existstingProduct){
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
      alert("Product quantity is increased")
    }else{
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
    }
   }
  return (
    <>
  <Header/>
  <div style={{marginTop:'100px'}} className='container mx-auto px-4'>
    {
     myWishlist.length>0?
   <>
   <h1 className='text-red-500 font-bold mb-5  text-3xl'>Your Wishlist</h1>  
    <div className='grid grid-cols-4 gap-4'>
    {
      myWishlist?.map(product=>(
        <div className="rounded border p-2 shadow">
      <img style={{width:'50%',height:'100px'}} src={product?.thumbnail} alt="" />
      <div className="text-center">
        <h3 className='text-xl font-bold'>{product?.title}</h3>
        <div className="flex justify-evenly mt-3">
          <button  onClick={()=>dispatch(removeWishlistItem(product?.id))} className='text-xl'><i className="fa-solid text-red-600 fa-heart-circle-xmark"></i></button>
          <button onClick={()=>handleAddToCart(product)} className='text-xl'><i className="fa-solid fa-cart-plus text-green-600"></i></button>

        </div>
      </div>
    </div>
      ))
    }
  </div>
  </>
  :
  <div style={{height:'70vh'}} className='flex flex-col items-center justify-center w-full'>
    <img  src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png" alt="" />
   <h1  className='text-3xl font-bold text-blue-600'>Your Wishlist is Empty</h1> 
  </div>
  
   
}
  </div>
  </>
  )
}

export default Wishlist
