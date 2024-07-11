import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../Context/ContextProduct';
import Loading from '../layouts/Loading/Loading';
import { useNavigate } from 'react-router-dom'; 
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import axios from 'axios';
import { useAlert } from 'react-alert';

function Cart_Item() {
  const { cart ,fetchProductById,loading,getCartItem,user} = useAppContext();
  const navigate=useNavigate()
  const alert=useAlert()
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading]=useState(false);
  const [quantities, setQuantities] = useState([]);
  const [prices, setPrices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (cart.length > 0) {
      getCartItem();
      localStorage.setItem("Cart_Items",JSON.stringify(cart))
    }
  }, [cart.length])

  useEffect(() => {
    fetchCartProductDetails();
  }, [cart]);

  useEffect(()=>{
    if(user){
      getCartItem()
    }
  },[user])

  useEffect(() => {
    if (cartItems.length > 0) {
      calculateTotal();
    }
  }, [cartItems,quantities]);

  const fetchCartProductDetails = async () => {
    if (cart.length > 0) {
      const items = await Promise.all(
        cart.map(async (item) => {
          const response = await fetchProductById(item.product);
          return response.data.product;
        })
      );
      setCartItems(items);
      setQuantities(cart.map((item) => item.quantity));
      setPrices(items.map((item) => item.price));
    }
    else {
      setCartItems([]); 
      setQuantities([]);
      setPrices([]);
    }
  };
  const removeItemFromCart = async (id) => {
    if (user) {
      try {
        setCartLoading(true);
          await axios.get("http://localhost:4000/api/v1/delete-product-from-cart", {
          params: { userId: user._id, Id: id },
          withCredentials: true
        });
        alert.success("item remove successful")
        getCartItem();
        setCartLoading(false);
      } catch (error) {
        console.log('Error:', error);
        setCartLoading(false);
      }
    }
  };

  const calculateTotal = () => {
    if (prices.length > 0) {
      const total = cart.reduce((sum, item, index) => {
        return sum + prices[index] * quantities[index];
      }, 0);
      setTotalAmount(total);
    }
  };

  const increase = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] < 10) {
      newQuantities[index] += 1;
      setQuantities(newQuantities);
    }
  };

  const decrease = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  };

  const GoToAddressPage=()=>{
    navigate("/set-delivary-address")
  }

  if (loading || cartLoading) {
    return <Loading />;
  }

  return (
    <div>
      {cartItems.length === 0 ? (
         <div className='h-[80vh] w-full flex flex-col justify-center items-center'>
         <div>
           <p>
             <RemoveShoppingCartIcon style={{ fontSize: '5rem', color: 'tomato' }} />
           </p>
         </div>
         <div className='text-center'>
           <p className='w-[40vw] h-[7vh] text-center font-[cursive] text-3xl mt-4 shadow-[0_0_15px_rgba(15,15,15,0.26)]'>No Product in your Cart</p>
           <button onClick={()=>navigate("/products")} className='bg-[rgba(0,0,0,0.72)] text-white size-4 mt-4 w-[10rem] h-[4rem] hover:bg-red-500'>View Product</button>
         </div>
       </div>
        
      ) : (
        <div className="mx-auto mt-10">
          <div className="cart_product sm:flex">
            <div className="Cart_items w-full sm:w-3/4 bg-white px-10 py-10 border-r border-b-slate-400">
              <div className="flex justify-evenly border-b pb-8">
                <h1 className='w-[20vw] h-[7vh] text-center shadow-[0_0_15px_rgba(15,15,15,0.26)] font-[cursive] text-[2vmax] border-b-[1.5px] border-b-[rgba(21,21,21,0.6)] text-[rgba(0,0,0,0.6)]'>
                  Shopping Cart
                </h1>
              </div>
              {cartItems.map((item, index) => (
                <div key={item._id} className="md:flex h-[20vw] ml-10 items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50">
                  <div className="md:w-4/12 2xl:w-1/4 w-1/3 h-50">
                    <img
                      src={item.image[0].url}
                      alt={item.image[0].public_id}
                      className="h-full object-center object-cover md:block hidden"
                    />
                    <img
                      src={item.image[0].url}
                      alt={item.image[0].public_id}
                      className="md:hidden w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                    <p className="text-[0.7vmax] leading-3 text-gray-500 md:pt-0 pt-3">{item._id}</p>
                    <div className="w-full">
                      <p className="text-base font-black leading-none text-gray-800">{item.name}</p>
                      <div className='flex pt-2'>
                        <p className='text-sm text-gray-800'>Quantity :</p>&nbsp;
                        <button className='bg-gray-400 w-4 mr-1' onClick={() => decrease(index)}>-</button>
                        <p className='mr-1 '>{quantities[index]}</p>
                        <button className='bg-gray-400 w-4' onClick={() => increase(index)}>+</button>
                      </div>
                    </div>
                    <p className="text-xs leading-3 text-gray-600 pt-2">Category: {item.category}</p>
                    <div className="flex items-center justify-between pt-5">
                      <div className="flex items-center">
                        <button onClick={()=>removeItemFromCart(item._id)} className="text-xs leading-3 underline text-red-500 cursor-pointer font-[cursive]">Remove</button>
                      </div>
                      <p className="text-base font-black leading-none text-gray-800 text-[rgba(0,0,0,0.6)]">
                        RS {item.price }
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div id="summary" className="Price_summery w-full sm:w-1/4 px-8 py-10 bg-[#fcfcfc] border-l border-b-slate-400">
              <div className="flex justify-between border-b pb-8">
                <h1 className='w-[20vw] h-[7vh] text-center shadow-[0_0_15px_rgba(15,15,15,0.26)] font-[cursive] text-[2vmax] border-b-[1.5px] border-b-[rgba(21,21,21,0.6)] text-[rgba(0,0,0,0.6)]'>Order Summary</h1>
              </div>
              <div>
                <span className="font-semibold text-sm uppercase text-[rgba(0,0,0,0.6)]">Items {cartItems.length}</span>
              </div>
              {cartItems.map((item, index) => (
                <div key={item._id} className='flex justify-between my-2'>
                  <span className="font-semibold inline-block text-sm text-[rgba(0,0,0,0.6)]">{item.name} :</span>
                  <span className='text-sm font-semibold text-[rgba(0,0,0,0.6)]'>RS {item.price * quantities[index]}</span>
                </div>
              ))}
              <div className='flex justify-between mt-4'>
                <span className="font-semibold inline-block text-sm text-[rgba(0,0,0,0.6)]">Delivery Charge :</span>
                <span className='text-sm font-semibold text-[rgba(0,0,0,0.6)]'>RS: 50</span>
              </div>

              <div className="border-t mt-8 border-red-500">
                <div className="flex font-semibold justify-between py-6 text-sm text-[rgba(0,0,0,0.6)]">
                  <span>Gross Total</span>
                  <span>RS {totalAmount + 50}</span>
                </div>
                <button onClick={GoToAddressPage} className="bg-[rgb(78,166,133)] font-semibold hover:bg-[rgb(71,190,147)] py-3 text-sm text-white uppercase w-full">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart_Item;
