import React, { Fragment, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import ReactStars from "react-rating-stars-component";
import Reviews from './Reviews';
import Loading from '../layouts/Loading/Loading';
import { useAppContext } from '../../Context/ContextProduct';
import { useAlert } from 'react-alert';


const ProductDetail = () => {
  const { id } = useParams();
  const {AddInCart,fetchProductById,loading}=useAppContext()
  const alert=useAlert()
  const [product, setProduct] = useState(null);
  // const [loading, setLoading]=useState(false)
  const [number, setNumber]=useState(0)

  useEffect(() => {
    const fetchData=async()=>{
      try {
        const response =await fetchProductById(id)
        setProduct(response.data.product)
      } catch (error) {
        console.error("error is found",error);
      }
    }
    fetchData();
  }, [id]);

  const decrement=()=>{
    if(number==0)return
    else setNumber(number-1)
  }
  const increment=()=>{
    if(number<10)setNumber(number+1)
    else return
  }
  const AddToCart=()=>{
    if(number>0){
      AddInCart(product,number)
      alert.success(`${number} Item add successful`)
    }else return 
  }
  return (
    <>
    <Fragment>
    {loading?(<Loading/>):
      (product && (
        <Fragment>
        <div className="productDetails">
        <div>
        <Carousel showStatus={false}>
          <div className='product-img'>
            <img src={product.image[0].url} alt="" />
          </div>
        </Carousel>
      </div>

      <div>
        <div className="detailsBlock-1">
          <h2>{product.name}</h2>
          <p>Product # {product._id}</p>
        </div>
        <div className="detailBlock-2">
            <ReactStars 
                edit={false}
                color="rgba(20,20,20,0.2)"
                activeColor="tomato"
                size={window.innerWidth < 600 ? 20 : 25}
                value={product.ratings}
                isHalf={true}
          />
          &nbsp;
          <span>({product.noOfReviews} Reviews)</span>
        </div>

        <div className="detailBlock-3">
          <h1>{`₹${product.price}`}</h1>
          <div className="detailBlock-3-1">
            <div className="detailBlock-3-1-1">
              <button onClick={decrement}>-</button>
              {/* <input value='0' onChange={handleQuantityChange} type="number" ></input> */}
              <p>{number}</p>
              <button onClick={increment}>+</button>
              <button onClick={AddToCart}>Add to Cart</button>
            </div>
            <p>
              Status:{" "}
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutofStock" : "InStock"}
              </b>
            </p>
          </div>
        </div>
        <div className="detailBlock-4">
          Discription: <p>{product.description}</p>
        </div>
        <button className='submitReview'>Submit Review</button>
      </div>
    </div>
      </Fragment>
      ))
    }
  </Fragment>
      {/* This is the review of the products */}
      <div >
        <p className='w-[20vmax] mx-auto text-center border-b border-solid border-black border-opacity-26 px-1 py-1 text-xl text-black opacity-75 font-medium mb-[4vmax]'>Reviews</p>

        {product && product.reviews ? (
          <Reviews product={product} />
        ) : (
          <p className='w-[20vmax] h-[5vmax] mx-auto flex flex-col justify-center align-bottom text-center overflow-auto border-b border-solid border-black border-opacity-26 px-1 py-1 text-black opacity-75 font-medium' style={{ boxShadow: '0 0 5px rgba(0,0,0,0.23)', display: 'flex', alignItems: 'center' }}>No Reviews Yet</p>
        )}
      </div>

    </>
  );
};

export default ProductDetail;
