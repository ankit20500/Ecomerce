import React,{useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/ContextProduct';
import axios from 'axios';
import Swal from 'sweetalert2'




const PaymenthtmlForm = () => {
    const navigate=useNavigate()
    const {fetchProductById,user}=useAppContext();
    const [subtotal,setSubTotal]=useState(null);
    const [total, setTotal]=useState(null);
    const [fullName, setFullName]=useState('')
    const [cardNumber, setCardNumber]=useState('')
    // const [orderItems, setOrderItems]=useState([])
    const [shippingInfo,setShippingInfo]=useState([])
    const [cartInfo, setCartInfo]=useState([])


    const tostfn = {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark"
    };
    
    useEffect(()=>{
        const address=JSON.parse(localStorage.getItem("address"))
        const pricing=JSON.parse(localStorage.getItem("Pricing"));
        if(!address && !pricing){
            toast.error("you cannot direct go to the payment option",tostfn)
            navigate("/cart")
        }else{
            setShippingInfo(address);
            setSubTotal(pricing.subtotal)
            setTotal(pricing.totalPrice)
        }
    },[])

    useEffect(() => {
        const fetchCartInfo = async () => {
            const cartItems = JSON.parse(localStorage.getItem("Cart_Items"));
            const fetchedCartItems = await Promise.all(cartItems.map(async (item) => {
                const response = await fetchProductById(item.product);
                return {...response.data.product,
                        quantity:item.quantity
                };
            }));
            setCartInfo(fetchedCartItems);
        };
        fetchCartInfo();
    }, []);
    

    // useEffect(() => {
    //     const handleUnload = () => {
    //         localStorage.removeItem('address');
    //     };
    //     window.addEventListener('behtmlForeunload', handleUnload);
    //     return () => {
    //         window.removeEventListener('behtmlForeunload', handleUnload);
    //     };
    // }, []);

// 4158789632587415

    const handlePayment=async(event)=>{
        event.preventDefault();
        const taxPrice=0.18*total;
        const shippingPrice=50;
        const orderItems=cartInfo.map((item,index)=>({
            name:item.name,
            price:item.price,
            quantity:item.quantity,
            image:item.image[0].url,
            product:item._id
        }))
        const obj={
            shippingInfo:shippingInfo,
            orderItems:orderItems,
            paymentInfo:{
                cardNumber:cardNumber,
                status:"Successfully payment"
            },
            itemPrice:subtotal,
            taxPrice:taxPrice,
            shippingPrice:shippingPrice,
            totalPrice:total,
        }
        await axios.post("http://localhost:4000/api/v1/order/new",obj,{
            withCredentials: true
        })
        Swal.fire({
            position: "middle",
            icon: "success",
            title: "your order has been placed",
            showConfirmButton: false,
            timer: 1500
          });
        localStorage.removeItem("address");
        localStorage.removeItem("Pricing");
        setTimeout(() => {
            navigate("/")
            toast.info("Now you can view more products",tostfn)
        }, 2000);
    }

    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-5xl">
                    <div className='flex justify-center w-[50vw]'>
                    <h2 className="flex justify-center p-2 text-lg font-semibold text-gray-700 dark:text-white sm:text-base w-[20vmax] shadow-[0_0_15px_rgba(15,15,15,0.26)] font-[cursive] text-[2vmax] border-b-[1px] border-b-black xl:text-2xl xl:leading-9 md:text-xl">Payment Option</h2>
                    </div>

                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                        <form action="#" className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
                            <div className="mb-6 grid grid-cols-2 gap-4">
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Full name (as displayed on card)* </label>
                                    <input onChange={(e)=>setFullName(e.target.value)} value={fullName} type="text" id="full_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Card number* </label>
                                    <input onChange={(e)=>setCardNumber(e.target.value)} value={cardNumber} type="text" id="card-number-input" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="xxxx-xxxx-xxxx-xxxx" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
                                </div>

                                <div>
                                    <label htmlFor="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Card expiration* </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                                            <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <input id="card-expiration-input" type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="12/23" required />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                                        CVV*
                                        <button data-tooltip-target="cvv-desc" data-tooltip-trigger="hover" className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                                            <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <div id="cvv-desc" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                            The last 3 digits on back of card
                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                    </label>
                                    <input type="number" id="cvv-input" aria-describedby="helper-text-explanation" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="•••" required />
                                </div>
                            </div>

                            <button onClick={handlePayment} className='flex w-full items-center justify-center rounded-lg bg-red-500 text-white px-5 py-2.5 font-[cursive] hover:bg-red-600 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 '>Pay now</button>

                        </form>

                        <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">RS {subtotal}</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                        <dd className="text-base font-medium text-green-500">RS -299</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">shipping charge</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">RS 50</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-red-600 dark:text-gray-400">Tax (18%)</dt>
                                        <dd className="text-base font-medium text-red-600 dark:text-white">RS {0.18*subtotal}</dd>
                                    </dl>
                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                    <dd className="text-base font-bold text-gray-900 dark:text-white">RS {total-299}</dd>
                                </dl>
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-8">
                                <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="" />
                                <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="" />
                                <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
                                <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
                                <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
                                <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default PaymenthtmlForm;
