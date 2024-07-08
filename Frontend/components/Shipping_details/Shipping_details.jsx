import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/ContextProduct'
import Loading from '../layouts/Loading/Loading'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Shipping_details() {
    const navigate=useNavigate()
    const { fetchProductById } = useAppContext()
    const [cart, setCart] = useState([])
    const [quantity, setQuantity] = useState([])
    const [loading, setLoading] = useState(true)
    const [orderAddress, setOrderAddress] = useState(null)
    const [totalCost, setTotalCost]=useState(null);

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

    useEffect(() => {
        const fetchCartData = async () => {
            const cart_items_str = localStorage.getItem("Cart_Items");
            const cart_items = JSON.parse(cart_items_str);
            setLoading(true)
            if (cart_items && cart_items.length > 0) {
                const items = await Promise.all(
                    cart_items.map(async (item) => {
                        const response = await fetchProductById(item.product);
                        return response.data.product;
                    })
                );
                setCart(items);
                setQuantity(cart_items.map(qu => qu.quantity))
                setLoading(false)
            }
        };
        fetchCartData();
        const addressobj = localStorage.getItem("address");
        if (addressobj) {
            setOrderAddress(JSON.parse(addressobj))
        } else {
            toast("Please fill the delivery address first", tostfn)
            navigate("/set-delivary-address")
        }
    }, [navigate, fetchProductById]);
    
    const CalculateTotal=()=>{
        if(cart.length > 0){
            const total=cart.reduce((sum,item,index)=>{
                return sum+ item.price *quantity[index]
            },0)
            setTotalCost(total);
        }
    }
    useEffect(()=>{
        CalculateTotal();
    },[cart])

    useEffect(() => {
        const handleUnload = () => {
            localStorage.removeItem('address');
        };
        window.addEventListener('beforeunload', handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);

    const HandleSubmitPayment=()=>{
        const formattedPrice=formatPrice(totalCost);
        const price = Number(formattedPrice.replace(/,/g, ''))
        const totalPrice=50+0.18*price+price;
        const taxPrice=0.18*price;
        const obj={
            subtotal:price,
            taxPrice:taxPrice,
            shippingPrice:50,
            totalPrice:totalPrice
        }
        localStorage.setItem("Pricing",JSON.stringify(obj))
        navigate("/payment-option")
    }


    // for formating the price in indian format
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits:0
        }).format(price);
    };

    if (loading) return <Loading />
    return (
        <div>
            {cart.length > 0 && (
                <div className="2xl:container 2xl:mx-auto py-14 px-4 md:px-6 xl:px-20">
                    <div className="flex flex-col xl:flex-row justify-center items-center space-y-10 xl:space-y-0 xl:space-x-8">
                        <div className="flex justify-center flex-col w-full lg:w-9/12 xl:w-full">
                            <div className='flex justify-center'>
                                <h3 className="flex justify-center text-xl w-[25vw] shadow-[0_0_15px_rgba(15,15,15,0.26)] font-[cursive] text-[1.4vmax] border-b-[2px] border-b-[rgba(21,21,21,0.6)] xl:text-4xl dark:text-white font-semibold xl:leading-9 md:text-left text-gray-600">
                                Order Summary</h3></div>
                            <div className='my-8 ml-10 w-full flex justify-center'>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row '>
                                        <p>Name :</p>
                                        <p className='ml-9'>{orderAddress.name}</p>
                                    </div>
                                    <div className='flex w-[30vw]'>
                                        <p className='whitespace-nowrap'>Address :</p>
                                        <p className='ml-5 flex-grow break-words'>{orderAddress.address}</p>
                                    </div>
                                    <div className='flex flex-row'>
                                        <p>Phone no :</p>
                                        <p className='ml-3'>{orderAddress.number}</p>
                                    </div>
                                    <div className='flex flex-row'>
                                        <p>City :</p>
                                        <p className='ml-14'>{orderAddress.selectedCity}</p>
                                    </div>
                                    <div className='flex flex-row'>
                                        <p>State :</p>
                                        <p className='ml-11'>{orderAddress.selectedState}</p>
                                    </div>
                                    <div className='flex flex-row'>
                                        <p>PinCode :</p>
                                        <p className='ml-5'>{orderAddress.pinCode}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='shopping_cart flex gap-10'>
                                <div className="flex flex-col items-start w-full mt-8 space-y-4">
                                    {cart.map((item, index) => (
                                        <div key={index} className="flex flex-col justify-center items-center w-full">
                                            <div className="flex flex-row justify-start items-center border border-gray-200 h-[10vmax] w-full p-4">
                                                <div className="flex-shrink-0 w-20 md:w-32 md:h-[10vmax]">
                                                    <img className="hidden mt-3 md:block h-[8vmax]" src={item.image[0].url} alt="product-image" />
                                                    <img className="md:hidden h-[8vmax]" src={item.image[0].url} alt="product-image" />
                                                </div>
                                                <div className="flex flex-col justify-start items-start w-full pl-4 md:px-8">
                                                    <div className="flex flex-col justify-start items-start">
                                                        <h3 className="text-lg lg:text-xl md:text-lg dark:text-white font-semibold leading-6 md:leading-5 text-gray-800">
                                                            {item.name}
                                                        </h3>
                                                        <div className="flex flex-row justify-start space-x-4 md:space-x-6 items-start mt-4">
                                                            <p className="text-sm leading-none dark:text-gray-300 text-gray-600">
                                                                Quantity: <span className="text-gray-800 dark:text-white">{quantity[index]}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex mt-4 md:mt-0 md:justify-end items-center w-full">
                                                        <p className="text-xl md:text-lg dark:text-white lg:text-xl font-semibold leading-5 lg:leading-6 text-gray-800">
                                                            RS {item.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col justify-center bg-gray-100 p-5 border rounded-md mt-8 -mr-10 space-y-4" style={{ flexGrow: 0, flexShrink: 0, width: '300px', height: '280px' }}>
                                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                        <div className="flex justify-between w-full">
                                            <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">Rs {formatPrice(totalCost)}</p>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <p className="text-base dark:text-white leading-4 text-red-700">GST (18%)</p>
                                            <p className="text-base dark:text-gray-300 leading-4 text-red-700">{formatPrice(0.18*totalCost)}</p>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <p className="text-base leading-4 dark:text-white text-gray-800">
                                                Handling fees                                            
                                                </p>
                                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">Rs 5</p>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <p className="text-base dark:text-white leading-4 text-gray-800">Shipping Charge</p>
                                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">Rs 50</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                        <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{formatPrice(totalCost+5+50+(0.18*totalCost))}</p>
                                    </div>
                                    <div className="flex w-full justify-center items-center pt-1 md:pt-3">
                                        <button onClick={HandleSubmitPayment} className="w-full hover:bg-red-600 text-base font-medium leading-none text-white py-4 bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600">
                                            Payment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Shipping_details
