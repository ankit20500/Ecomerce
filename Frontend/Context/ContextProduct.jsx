import React, { createContext, useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';

export const LevelContext = createContext();

const LevelContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      getCartItem();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/api/v1/products");
      setProducts(response.data.product); 
      setLoading(false);
    } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
    }
  };

  const fetchAuthenticationStatus = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:4000/api/v1/profile", {
        withCredentials: true,
      });
      setUser(response.data.user);
      setIsAuthenticated(response.data.success);
      setLoading(false)
    } catch (error) {
      console.error('Error is fetching in authentication process:', error);
      setLoading(false)
      if (error.response && error.response.status === 401) {
        setIsAuthenticated(false);
      }
    }
  };

  const fetchUserData = async () => {
    await fetchAuthenticationStatus();
  };

  useEffect(() => {
    fetchProducts();
    fetchUserData();
  }, []);

  const AddInCart = async (product, quantity) => {
    const obj = {
      userId: user._id,
      productId: product._id,
      quantity: quantity
    }
    try {
      await axios.post("http://localhost:4000/api/v1/new/cart-Items", obj, {
        withCredentials: true,
      });
      await getCartItem();
    } catch (error) {
      console.log(error)
    }
  }

  const getCartItem = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:4000/api/v1/cart-items", {
        params: { userId: user._id },  
        withCredentials: true
      });
      setCart(response.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const fetchProductById = async (id) => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:4000/api/v1/products/${id}`);
      setLoading(false)
      return response;
    } catch (error) {
      console.error("error is found", error);
      setLoading(false)
    }
  }

  return (
    <LevelContext.Provider value={{ products, loading, isAuthenticated, user, fetchUserData, AddInCart, cart,getCartItem,fetchProductById }}>
      {children}
    </LevelContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(LevelContext);
};

export default LevelContextProvider;
