import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Dashboard from './pages/Admin/Dashboard';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Home from './pages/Home';
import About from './pages/About';
import Cart from './pages/User/Cart';
import Products from './pages/User/Products';
import AddProduct from './pages/Admin/AddProduct';
import ViewUsers from './pages/Admin/ViewUsers';
import AvailableProduct from './pages/Admin/AvailableProduct';
import Orders from './pages/Admin/Orders';
import TotalEarning from './pages/Admin/TotalEarning';
import Profile from './pages/User/Profile';
import DarkModeProvider from './context/ThemeContext';
import ProductView from './pages/User/ProductView';
import UserOrders from './pages/User/UserOrders';

function App() {
  return (
    <div className="App">
        <DarkModeProvider>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<RegisterForm/>} />
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/product' element={<Products/>}/>
            <Route path='/add' element={<AddProduct/>}/>
            <Route path='/viewusers' element={<ViewUsers/>}/>
            <Route path='/available' element={<AvailableProduct/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/total' element={<TotalEarning/>}/> 
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/productview/:id' element={<ProductView/>}/>
            <Route path='/userorders' element={<UserOrders/>}/>
          </Routes>
          <Footer/>
          </DarkModeProvider>
    </div>
  );
}

export default App;
