import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const LevelContext = createContext();

const LevelContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get("http://localhost:4000/api/v1/products");
        setProducts(response.data.product); // Access response data and set products state
        setLoading(false);
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <LevelContext.Provider value={{ products,loading }}>
      {children}
    </LevelContext.Provider>
  );
};

export default LevelContextProvider;
