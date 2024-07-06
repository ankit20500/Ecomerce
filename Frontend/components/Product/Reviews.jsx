import React from 'react';
import ReactStars from "react-rating-stars-component";
import { CgProfile } from "react-icons/cg";
import './ProductDetails.css';

function Reviews({ product }) {
  return (
    <div className='review-box flex flex-row justify-center'>
      {product.reviews.map((review, index) => {
        const options = {
          edit: false,
          color: "rgba(20,20,20,0.2)",
          activeColor: "tomato",
          size: window.innerWidth < 600 ? 20 : 25,
          value: review.rating, 
          isHalf: true
        };

        return (
          <div key={index} className='media-query w-[20vmax] h-[20vmax] flex flex-col justify-center align-bottom text-center overflow-auto ml-3 border-b border-solid border-black border-opacity-26 px-1 py-1 text-black opacity-75' style={{ boxShadow: '0 0 5px rgba(0,0,0,0.23)', display: 'flex', alignItems: 'center' }}>
            <div className='flex justify-center'><CgProfile /></div>
            <div className='text-xl font-medium'>{review.name}</div>
            <div className='flex justify-center'><ReactStars {...options} /></div>
            <div className='text-xs font-normal'>{review.comment}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Reviews;
