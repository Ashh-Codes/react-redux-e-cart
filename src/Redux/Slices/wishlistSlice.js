import { createSlice } from "@reduxjs/toolkit";


const wishlistSlice = createSlice(
    {
        name:'wishlist',
        initialState:[],
        reducers :{
            //add item to wislist
            addToWishlist : (state,productByComponentAction)=>{
                state.push(productByComponentAction.payload)
            },
            //remove item by Id and show rest of items in page
            removeWishlistItem : (state,productByComponentAction)=>{
               return state.filter(item=>item.id != productByComponentAction.payload)
            }
        }
    }
)

export const{addToWishlist,removeWishlistItem} = wishlistSlice.actions
export default wishlistSlice.reducer