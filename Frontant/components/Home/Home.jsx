import React, { Fragment, useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import AllProduct from '../Home/product';
import MetaData from '../layouts/MetaData';
import { getProduct } from '../../States/actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';
import Loading from '../layouts/Loading/Loading';
import { useAlert } from 'react-alert';

export default function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title="Ecommerce" />
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
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
        </Fragment>
      )}
    </Fragment>
  )
}
