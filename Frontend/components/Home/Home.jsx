import React, { Fragment, useContext, useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import AllProduct from '../Home/product';
import MetaData from '../layouts/MetaData';


import './Home.css';

import Loading from '../layouts/Loading/Loading'
import { LevelContext } from '../../Context/ContextProduct';

export default function Home() {

const {products,loading} = useContext(LevelContext);


  return (
    <Fragment>
    
      <MetaData title="Ecommerce" />
      {loading?<Loading/>:  <Fragment>
          <div className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCT BELOW</h1>
            <a href="#container">
              <button>scroll <CgMouse /></button>
            </a>
          </div>
          <h2 className='homeHeading'>Future Product</h2>
          <div className="container" id='container'>
            {products !== undefined && products.map((product) => <AllProduct product={product} key={product._id} />)}
          </div>
        </Fragment>}
      
     
    </Fragment>
  )
}
