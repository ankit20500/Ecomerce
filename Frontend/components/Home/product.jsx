import {Link} from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import './Home.css'



export default function product({product}){
    const options={
        edit:false,
        color:"rgba(20,20,20,0.2)",
        activeColor:"tomato",
        size:window.innerWidth < 600?20:25,
        value:product.ratings,
        isHalf:true
    }
    return (
        <Link className='productCart' to={`/product/${product._id}`}>
           
            <img src={`https://source.unsplash.com/random`} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options}/> <span>{`(${product.noOfReviews} Reviews)`}</span>
            </div>
            <span>{`₹ ${product.price}`}</span>
        </Link>
    )
}