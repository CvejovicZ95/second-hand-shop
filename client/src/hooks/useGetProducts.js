import {useEffect,useState} from 'react'
import { toast } from 'react-toastify';

const useGetProducts=()=>{
  const [products,setProducts]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    const getProducts=async()=>{
      setLoading(true)
      try{
        const res=await fetch('http://localhost:4000/api/ads')
        const data=await res.json()
        if(data.error){
          throw new Error(data.error)
        }
        setProducts(data)
      }catch(error){
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    }
    getProducts()
  },[])
  
  return{loading,products}
}

export {useGetProducts}