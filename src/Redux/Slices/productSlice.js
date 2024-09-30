import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk("products/fetchAllProducts",async()=>{ 
    const result = await axios.get("https://dummyjson.com/products")
//  console.log(result);
    sessionStorage.setItem("allProducts",JSON.stringify(result.data.products))//othervise all data will be lost while refreshing view page
    return result.data.products
    
})

//name of productslice  which is products should be follwed by thunk method name in createasyncthunk first string arguments,2nd a fn.
const productSlice =createSlice({
    name:'products',
    initialState:{
        allProducts:[],
        dummyAllProducts:[],
        loading:false,
        error:""
    },
    reducers:{
        //search products
        searchProducts : (state,actionFromHeader)=>{
            state.allProducts = state.dummyAllProducts.filter(item=>item.title.toLowerCase().includes(actionFromHeader.payload))
        }
    },
    //since we get api result as action which is asyncronus and redux is synchronus so we use createasyncthunk() method and extrareducer which returns a promise 
    extraReducers:(builder)=>{
        builder.addCase(fetchAllProducts.fulfilled,(state,apiResult)=>{
            state.allProducts = apiResult.payload
            state.dummyAllProducts =apiResult.payload
            state.loading=false
            state.error =""
        })
        builder.addCase(fetchAllProducts.pending,(state,apiResult)=>{
            state.allProducts = []
            state.dummyAllProducts = []
            state.loading=true
            state.error =""
        })
        builder.addCase(fetchAllProducts.rejected,(state,apiResult)=>{
            state.allProducts = []
            state.dummyAllProducts = []
            state.loading=false
            state.error ="API Call failed...try after sometime"
        })
    }
})
export  default productSlice.reducer
export const {searchProducts} = productSlice.actions