import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Product from "../Home/product"
import Loading from '../layouts/Loading/Loading';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function SearchResult() {
    const query = useQuery();
    const name = query.get('name');
    const [result, setResult]=useState(null);
    const [loading, setLoading]=useState(false)

    useLayoutEffect(()=>{
        const fetchData=async()=>{
            setLoading(true);
          const response=await axios.get(`http://localhost:4000/api/v1/product/name?name=${name.trim()}`)
          setResult(response.data)
          setLoading(false)
        }
        fetchData();
      },[name])

  return (
    <div className='flex flex-col items-center justify-center w-[80vw] text-center m-auto min-h-screen'>
            <div className='h-[20vh] flex items-center justify-center'>
            <h1 className='w-[30vw] shadow-[0_0_15px_rgba(15,15,15,0.26)] font-[cursive] text-[1.4vmax] border-b-[2px] border-b-[rgba(21,21,21,0.6)] p-[1vmax] my-[5vmax] mx-auto text-[rgba(0,0,0,0.8)]'>
                    Products
                </h1>
            </div>
            <div className='w-full'>
                {loading ? <Loading /> : (
                    <div className='flex flex-wrap justify-center'>
                        {result && result.map((product) => <Product product={product} key={product._id} />)}
                    </div>
                )}
            </div>
        </div>
  )
}

export default SearchResult