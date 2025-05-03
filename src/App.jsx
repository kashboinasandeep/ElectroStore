import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from "./Pages/Index";
import Cart from "./Pages/Cart";
import About from './Pages/About';
import Service from "./Pages/Service";
import Store from "./Pages/Store";
import Dashboard from "./Pages/users/Dashboard";
import Profile from "./Pages/users/Profile";
import UserDetails from './Pages/users/UserDetails';
import CustomNavbar from './Components/Navbar';
import Contact from './Pages/Contact';
import { ToastContainer } from 'react-toastify';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/users/Home';
import UserProvider from './Context/UserProvider';
import Orders from './Pages/users/Orders';
import AdminDashboard from './Pages/admin/AdminDashboard';
import AdminHome from './Pages/admin/AdminHome';
import AddProduct from './Pages/admin/AddProduct';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer theme='dark' draggable />
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/store" element={<Store />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          {/* Nested Routes for Users */}
          <Route path="/users" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="profile/:userId" element={<Profile />} />
            <Route path="userdetails" element={<UserDetails />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* Routes for Admin */}
          <Route path="/admin" element={<AdminDashboard />}>
          <Route path="home" element={<AdminHome />} />
          <Route path="add-product" element={<AddProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
