import React, { Fragment, useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { getProductDetails } from '../../States/actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import './ProductDetails.css'
import axios from 'axios';
import ReactStars from "react-rating-stars-component"

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null)

  //   const dispatch =useDispatch();
  //   const product=useSelector((state)=>state.product)
  // console.log(product)

  //   useEffect(()=>{
  //     dispatch(getProductDetails(id))
  //   },[dispatch,id])

  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data)
      })
  }, [id])

 console.log(product)
 const options={
  edit:false,
  color:"rgba(20,20,20,0.2)",
  activeColor:"tomato",
  size:window.innerWidth < 600?20:25,
  value:product && product.ratings,
  isHalf:true
}
  return (
    <Fragment>
      <div className="productDetails">
        <div>
          <Carousel showStatus={false}>
          {product && <div className='product-img'>
            <img src={product.product.image[0].url} alt="" />
             </div>}
          </Carousel>
        </div>

      <div>
        <div className="detailsBlock-1">
          <h2>{product && product.product.name}</h2>
          <p>Product # {product && product.product._id}</p>
        </div>
        <div className="detailBlock-2">
          <ReactStars {...options}/>
          <span>({product && product.product.noOfReviews} Reviews)</span>
        </div>

        <div className="detailBlock-3">
          <h1>{`₹${product && product.product.price}`}</h1>
          <div className="detailBlock-3-1">
            <div className="detailBlock-3-1-1">
              <button>-</button>
              <input value="1" type="number" />
              <button>+</button>
              <button>Add to Cart</button>
            </div>
            <p>
              <b className={product && product.product.Stock < 1 ?"redColor" :"greenColor"}>
                {product && product.product.Stock < 1 ?"OutofStock":"Stock"}
              </b>
              "
            </p>
          </div>
        </div>
        <div className="detailBlock-4">
            Discription: <span>{product && product.product.description}</span>
        </div>
          <button className='submitReview'>submit Review</button>

      </div>
      </div>
    </Fragment>
  )
}

export default ProductDetail



