import { createSlice } from "@reduxjs/toolkit";

const cartSlice =createSlice({
    name:'cartItems',
    initialState:[],
    reducers:{
        //add to cart
        addToCart:(state,actionFromView)=>{
            const existstingProduct = state.find(item=>item.id ==actionFromView.payload.id)
            if(existstingProduct){
                const remainingProduct=state.filter(item=>item.id !=existstingProduct.id)
                existstingProduct.quantity++
                existstingProduct.totalPrice=existstingProduct.quantity*existstingProduct.price
                state=[...remainingProduct,existstingProduct]
            }
            else{
                state.push({...actionFromView.payload,quantity:1,totalPrice:actionFromView.payload.price})
            }
        },
        //remove single item from cart
        removeFromCart :(state,actionFromCart)=>{
            return  state.filter(item=>item.id!=actionFromCart.payload)
        },
        //increment quantity
        incQuantity:(state,actionFromCart)=>{
            const existstingProduct =state?.find(item=>item.id==actionFromCart.payload)
            existstingProduct.quantity++
            existstingProduct.totalPrice=existstingProduct.quantity*existstingProduct.price
            const remainingProduct=state.filter(item=>item.id !=existstingProduct.id)
            state=[...remainingProduct,existstingProduct]
          },
          decQuantity:(state,actionFromCart)=>{
            const existstingProduct =state?.find(item=>item.id==actionFromCart.payload)
            existstingProduct.quantity--
            existstingProduct.totalPrice=existstingProduct.quantity*existstingProduct.price
            const remainingProduct=state.filter(item=>item.id !=existstingProduct.id)
            state=[...remainingProduct,existstingProduct]
          },
          emptyCart:(state)=>{
            return state=[]
          }
    }
})
export const {addToCart,removeFromCart,incQuantity,decQuantity,emptyCart}  = cartSlice.actions
export default cartSlice.reducer