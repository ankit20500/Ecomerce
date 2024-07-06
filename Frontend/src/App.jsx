import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import './App.css';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import Home from '../components/Home/Home'
import Search from '../components/SearchBar/Search.jsx';
import ALLProducts from '../components/ALLProducts/Products.jsx';
import ProductDetails from '../components/Product/ProductDetail.jsx';
import AuthForm from '../Auth/Signup.jsx';
import SearchResult from '../components/SearchResult/SearchResult.jsx';
import Profile from '../components/UserProfile/Profile.jsx';
import EditUserProfile from '../components/EditProfile/EditUserProfile.jsx';
import EditPassword from '../components/EditProfile/EditPassword.jsx';
import Cart_Item from '../components/Cart_Item/Cart_Item.jsx';
import SetAddress from '../components/Delivary_Address/SetAddress.jsx';
import UserOption from '../components/Speed_Dials/UserOption.jsx';
import Shipping_details from '../components/Shipping_details/Shipping_details.jsx';

function App() {
  return (
    <Router>
        <Header />
        {<UserOption/>}
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails/>}/>
          <Route path='/register' element={<AuthForm/>}/>
          <Route path='/Search' element={<Search/>}/>
          <Route path='/Cart' element={<Cart_Item/>}/>
          <Route path='/products' element={<ALLProducts/>}/>
          <Route path='/search-result' element={<SearchResult/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/edit-profile' element={<EditUserProfile/>}/>
          <Route path='/edit-password' element={<EditPassword/>}/>
          <Route path='/set-delivary-address' element={<SetAddress/>}/>
          <Route path='/shipping-details' element={<Shipping_details/>}/>
        </Routes>
        <Footer/>
    </Router>
  );
}

export default App;
