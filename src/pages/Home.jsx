import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../Redux/Slices/productSlice'


const Home = () => {
  const dispatch= useDispatch()
  const {allProducts,loading,error} = useSelector(state=>state.productReducer)
  //console.log(allProducts);
  const [currentPage,setcurrentPage] =useState(1)
  const productPerpage =8
  const totalPage = Math.ceil(allProducts?.length/productPerpage)
  const currentPageLastProductIndex = currentPage*productPerpage
  const currentPageStartProductIndex = currentPageLastProductIndex - productPerpage
  const visibleProductCard = allProducts?.slice(currentPageStartProductIndex,currentPageLastProductIndex)
  

  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[])

  const navigatenextpage =()=>{
    if(currentPage!=totalPage){
      setcurrentPage(currentPage+1)
    }
  }
  const navigateprevpage =()=>{
    if(currentPage!=1){
      setcurrentPage(currentPage-1)
    }
  }
  return (
  <>
  <Header insidehome={true}/>
  <div style={{marginTop:'80px'}} className='container mx-auto px-4'>
  {
    loading?
    <div className="flex justify-center items-center font-bold">
      <img style={{width:'70px',height:'70px'}} className='me-4' src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" alt="" />
    </div>
    :
    <>
    <div className='grid grid-cols-4 gap-4'>
    {
      allProducts.length>0?
      visibleProductCard.map(product=>(
        <div className="rounded border p-2 shadow">
        <img style={{width:'100%',height:'200px'}} src={product?.thumbnail} alt="" />
        <div className="text-center">
          <h3 className='text-xl font-bold mb-3'>{product?.title}</h3>
          <Link to={`/${product?.id}/view`} className='bg-blue-500 text-white p-1 inline-block rounded mb-3'>View More</Link>
        </div>
      </div>
      ))
      :
      <div className="font-bold text-center mt-5 mb-5 text-red-600">
        Product not found!!!!
      </div>
    }
  </div>
  {/* pagination */}
    <div className="flex justify-center items-center mt-5 mb-5">
    <span onClick={navigateprevpage} style={{cursor:'pointer'}}><i className='fa-solid fa-backward me-5'></i></span>
    <span className='font-bold'>{`${currentPage} of ${totalPage}`}</span>
    <span onClick={navigatenextpage} style={{cursor:'pointer'}}><i className='fa-solid fa-forward ms-5'></i></span>
    </div>
    </>
    
    

  }
  </div>
  </>
  )
}

export default Home
