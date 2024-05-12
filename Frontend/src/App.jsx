import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import Home from '../components/Home/Home'

import ProductDetails from '../components/Product/ProductDetail.jsx';

function App() {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
