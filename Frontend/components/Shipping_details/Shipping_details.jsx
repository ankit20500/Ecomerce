import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/ContextProduct'

function Shipping_details() {
    const { fetchProductById } = useAppContext()
    const [cart,setCart]=useState([])
    useEffect(async() => {
        const cart_items_str = localStorage.getItem("Cart_Items")
        const cart_items=JSON.parse(cart_items_str)
        const fetchCartData=async()=>{
            const items=await Promise.all(
                cart_items.map(async(item)=>{
                    const response=await fetchProductById(item.product);
                    return response.data.product;
                })
            )
            setCart(items)
        }
        fetchCartData()
        
        const address = localStorage.getItem("address")
    },[fetchProductById])
    return (

        <div className="2xl:container 2xl:mx-auto py-14 px-4 md:px-6 xl:px-20">
            <div className="flex flex-col xl:flex-row justify-center items-center space-y-10 xl:space-y-0 xl:space-x-8">
                <div className="flex justify-center flex-col w-full lg:w-9/12 xl:w-full">
                    <div className='flex justify-center'><h3 className="flex justify-center w-[25vw] shadow-[0_0_15px_rgba(15,15,15,0.26)] font-[cursive] text-[1.4vmax] border-b-[2px] border-b-[rgba(21,21,21,0.6)] text-3xl xl:text-4xl dark:text-white font-semibold xl:leading-9 md:text-left text-gray-600">Order Summary</h3></div>
                    <div className='my-8 ml-10 w-full flex justify-center'>
                        <div className='flex flex-col'>
                            <div className='flex flex-row '>
                                <p>Name :</p>
                                <p className='ml-9'>Ankit kumar</p>
                            </div>
                            <div className='flex w-[30vw]'>
                                <p className='whitespace-nowrap'>Address :</p>
                                <p className='ml-5 flex-grow break-words'>LaxmiSagar, sadhugachi,dbg sdkjfleskjehfd</p>
                            </div>
                            <div className='flex flex-row'>
                                <p>Phone no :</p>
                                <p className='ml-3'>8523697412</p>
                            </div>
                            <div className='flex flex-row'>
                                <p>City :</p>
                                <p className='ml-14'>Darbhanga</p>
                            </div>
                            <div className='flex flex-row'>
                                <p>State :</p>
                                <p className='ml-11'>Bihar</p>
                            </div>
                        </div>
                    </div>

                    <div className='shopping_cart flex flex-row gap-10'>
                        <div className="flex-col justify-center items-center w-full mt-8 space-y-4">
                            <div className="flex md:flex-row justify-start items-start md:items-center border border-gray-200 w-full">
                                <div className="-m-px w-40 md:w-32">
                                    <img className="hidden md:block" src="https://i.ibb.co/C7M7Mvx/Rectangle-8-2.png" alt="girl-in-white-dress" />
                                    <img className="md:hidden" src="https://i.ibb.co/MsbCZNJ/Rectangle-8.png" alt="girl-in-white-dress" />
                                </div>
                                <div className="flex justify-start md:justify-between items-start md:items-center flex-col md:flex-row w-full p-4 md:px-8">
                                    <div className="flex flex-col md:flex-shrink-0 justify-start items-start">
                                        <h3 className="text-lg md:text-xl dark:text-white font-semibold leading-6 md:leading-5 text-gray-800">Premium Quaility White Dress</h3>
                                        <div className="flex flex-row justify-start space-x-4 md:space-x-6 items-start mt-4">
                                            <p className="text-sm leading-none dark:text-gray-300 text-gray-600">Size: <span className="text-gray-800 dark:text-white"> Small</span></p>
                                            <p className="text-sm leading-none dark:text-gray-300 text-gray-600">Quantity: <span className="text-gray-800 dark:text-white"> 01</span></p>
                                        </div>
                                    </div>
                                    <div className="flex mt-4 md:mt-0 md:justify-end items-center w-full">
                                        <p className="text-xl dark:text-white lg:text-2xl font-semibold leading-5 lg:leading-6 text-gray-800">$28.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center bg-gray-100 p-5 border rounded-md mt-8 space-y-4 w-2/3">
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$56.00</p>
                                </div>
                                <div className="flex justify-between w-full">
                                    <p className="text-base leading-4 dark:text-white text-gray-800">
                                        Discount
                                        <span className="bg-gray-200  p-1 text-xs font-medium leading-3 text-gray-800">STUDENT</span>
                                    </p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">-$28.00 (50%)</p>
                                </div>
                                <div className="flex justify-between w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$8.00</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">$36.00</p>
                            </div>
                            <div className="flex w-full justify-center items-center pt-1 md:pt-4 xl:pt-8 space-y-6 md:space-y-8 flex-col">
                                <button className="py-5 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 w-full text-base font-medium leading-4 text-white bg-red-500 hover:bg-red-600"
                                >Process to Payment</button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex flex-col justify-center items-center mt-8 xl:mt-10 space-y-10 w-full">
                        <div className="flex justify-start items-start flex-col md:flex-row w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8 lg:w-full">
                            <div className="flex jusitfy-start items-start flex-col space-y-2">
                                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Billing Address</p>
                                <p className="text-sm leading-5 dark:text-gray-300 text-gray-600">180 North King Street, Northhampton MA 1060</p>
                            </div>
                            <div className="flex jusitfy-start items-start flex-col space-y-2">
                                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Shipping Address</p>
                                <p className="text-sm leading-5 dark:text-gray-300 text-gray-600">180 North King Street, Northhampton MA 1060</p>
                            </div>
                            <div className="flex jusitfy-start items-start flex-col space-y-2">
                                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Shipping Method</p>
                                <p className="text-sm leading-5 dark:text-gray-300 text-gray-600">DHL - Takes up to 3 working days</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>

    )
}

export default Shipping_details