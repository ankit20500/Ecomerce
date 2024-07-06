import React, { Fragment, useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import AllProduct from '../Home/product';
import MetaData from '../layouts/MetaData';
import './Home.css';
import Loading from '../layouts/Loading/Loading'
import { useAppContext } from '../../Context/ContextProduct';
import { Link } from 'react-router-dom';

export default function Home() {
const {products,loading} =useAppContext()

const scrollToHomeProduct = () => {
  const homeProductElement = document.getElementById('HomeProduct');
  if (homeProductElement) {
      homeProductElement.scrollIntoView({ behavior: 'smooth' });
  }
};

  return (
    <Fragment>
    
      <MetaData title="Ecommerce" />
      {loading?<Loading/>:  
      <Fragment>
          <div className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCT BELOW</h1>
            <Link to="#container">
              <button onClick={scrollToHomeProduct}>Scroll &nbsp; <CgMouse /></button>
            </Link>
          </div>
          <h2 className='homeHeading'>Future Product</h2>
          <div className="HomeProduct" id='HomeProduct'>
            {products !== undefined && products.slice(0,8).map((product) => <AllProduct product={product} key={product._id} />)}
          </div>
        </Fragment>
         }
      
     
    </Fragment>
  )
}
