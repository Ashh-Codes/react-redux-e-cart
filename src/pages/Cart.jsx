import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decQuantity, emptyCart, incQuantity, removeFromCart } from '../Redux/Slices/cartSlice'



const Cart = () => {
  const myCart = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()
  const [cartTotal,setCartTotal] =useState(0)
  const navigate =useNavigate()


  useEffect(()=>{
    if(myCart.length>0){
      setCartTotal(myCart?.map(item=>item.totalPrice)?.reduce((a,b)=>a+b))
    }
  },[myCart])

  const handleDecrementPorduct=(product)=>{
    if(product.quantity>0){
      dispatch(decQuantity(product.id))
    }
    else{
      dispatch(removeFromCart(product.id))

    }
  }
  const handleCheckout=()=>{
    dispatch(emptyCart())
    alert("Order has been placed successfully")
    navigate('/')
    
  }
  return (
   <>
    <Header/>
    <div style={{marginTop:'80px'}} className='container mx-auto px-3'>
      {
        myCart.length>0?
        <>
        <h1 className='font-bold text-3xl mb-5 text-red-500'>Cart Summary</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 border rounded p-5 shadow">
            <table className='table-auto w-full'>
                <thead>
                  <tr>
                    <td className='font-semibold'>#</td>
                    <td className='font-semibold'>Name</td>
                    <td className='font-semibold'>Img</td>
                    <td className='font-semibold'>Quantity</td>
                    <td className='font-semibold'>Price</td>
                    <td className='font-semibold'>...</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    myCart?.map((product,index)=>(
                      <tr key={product?.id}>
                    <td>{index+1}</td>
                    <td>{product?.title}</td>
                    <td><img width={'50px'} height={'100px'} src={product?.thumbnail} alt="" /></td>
                    <td>
                      <div className="flex">
                        <button onClick={()=>handleDecrementPorduct(product)} className='font-bold border p-3 me-2 ms-2'>-</button>
                        <input style={{width:'40px'}} className='border rounded p-3 me-2 ms-2' readOnly value={product?.quantity} type="text" />
                        <button onClick={()=>dispatch(incQuantity(product?.id))} className='font-bold border p-3 me-2 ms-2'>+</button>
                      </div>
                    </td>
                    <td>{product?.totalPrice}</td>
                    <td><button onClick={()=>dispatch(removeFromCart(product?.id))}><i className="fa-solid fa-trash text-red-500"></i></button></td>
                  </tr>
                    ))
                  }
                </tbody>
            </table>
            <div className="float-right mt-4">
              <button onClick={()=>dispatch(emptyCart())} className='bg-red-600 text-white rounded p-3 me-3'>EMPTY CART</button>
              <Link to={'/'} className='bg-blue-600 text-white rounded p-3 me-3'>SHOP MORE</Link>
            </div>
  
          </div>
          <div className="border rounded shadow p-5">
          <h1 className='text-2xl font-bold'>Total Amount: <span className='text-red-600'>{cartTotal}</span></h1>
          <hr />
          <button onClick={handleCheckout} className='bg-green-600 w-full rounded p-5 text-white font-bold mt-5'>Checkout</button>
        </div>
        </div>
        </>
        :

        <div style={{height:'70vh'}} className='flex flex-col items-center justify-center w-full'>
    <img  src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png" alt="" />
   <h1  className='text-3xl font-bold text-blue-600'>Your Cart is Empty</h1> 
  </div>
        
       
      }
    </div>
   </>
  )
}

export default Cart
