import React, { Fragment } from 'react'
import { useAppContext } from '../../Context/ContextProduct'
import Product from "../Home/product"
import Loading from '../layouts/Loading/Loading';

function Products() {
    const { products, loading } = useAppContext();
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
                        {products && products.map((product) => <Product product={product} key={product._id} />)}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products
