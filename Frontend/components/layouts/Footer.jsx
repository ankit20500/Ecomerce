import { FaSquareInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import './Footer.css'


export default function Footer(){
    return (
        <footer className='footer'>
            <div className="leftfooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App For Android and IOS mobile phone </p>

                <img src="https://th.bing.com/th/id/R.740290f9116c87003761b797ec0b8978?rik=T4%2f%2fp6dAe%2brA2g&riu=http%3a%2f%2fdata.ibtimes.sg%2fen%2ffull%2f12247%2fgoogle-play-store-8-1-73-apk.png&ehk=FTwPohieskMl4XmAWpapXS1bfZczszda5tYEZUU39JI%3d&risl=&pid=ImgRaw&r=0" alt="" />
                <img src="https://th.bing.com/th/id/OIP.W_ePhzXFCC352Bo8vLXPtwHaCL?rs=1&pid=ImgDetMain" alt="" />
            </div>
            <div className="midfooter">
                <h1 >ECOMMERCE</h1>
                <p>Hight Quality is our first priority</p>
                <p>Copyrights 2021 &copy; MrAnkit</p>
            </div>
            <div className="rightfooter">
                <h4>Follow Us</h4>
                <a href="https://www.instagram.com/_ankit_0108/"><FaSquareInstagram/></a>
                <a href="https://www.youtube.com/"><FaYoutube/></a>
                <a href="https://www.facebook.com/"><FaFacebookSquare/></a>
            </div>

        </footer>
    )
}