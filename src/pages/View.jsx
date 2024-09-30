import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../Redux/Slices/wishlistSlice'
import { addToCart } from '../Redux/Slices/cartSlice'



const View = () => {
  const myWishList = useSelector(state=>state.wishlistReducer)
  const myCart =useSelector(state=>state.cartReducer)

  const dispatch = useDispatch()
  const [product,setProduct] =useState()
  const {id} = useParams()
 // console.log(id);
  
  useEffect(()=>{
    if(sessionStorage.getItem("allProducts")){
      const allProducts =JSON.parse(sessionStorage.getItem("allProducts"))

      setProduct(allProducts.find(item=>item.id==id))
    }
  },[])
 // console.log(product);
 const handleWishlist =(product)=>{
    if(myWishList?.includes(product)){
      alert("Product already added")
    }else{

      dispatch(addToWishlist(product))
    }
 }
 const handleAddToCart =(product)=>{
  const existstingProduct =  myCart?.find(item=>item.id==product.id)
  if(existstingProduct){
    dispatch(addToCart(product))
    alert("Product quantity is increased")
  }else{
    dispatch(addToCart(product))
  }
 }
  
  return (
    <>
    <Header/>
    <div style={{minHeight:'90vh'}} className="flex justify-center items-center mx-5">
        <div className="grid grid-cols-2 items-center">
          <img  style={{width:'100%',height:'300px'}} src={product?.thumbnail} alt="" />
          <div>
            <h3>PID:{product?.id}</h3>
            <h1 className='text-3xl font-bold'>{product?.title}</h1>
            <h4 className='font-bold text-xl text-red-500'>$ {product?.price}</h4>
            <p> <span className='font-bold'>Description :</span>{product?.description}</p>
            <div className="flex justify-between m-5">
              <button onClick={()=>handleWishlist(product)} className='bg-red-600 text-white p-2 rounded'>ADD TO Wishlist</button>
              <button onClick={()=>handleAddToCart(product)} className='bg-green-600 text-white p-2 rounded'>ADD TO CART</button>

            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default View
