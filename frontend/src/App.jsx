import './App.css'
import { Route, Routes } from 'react-router'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch,useSelector } from 'react-redux';
import { fetchCartItems } from './ReduxStore/cartSlice';
import { useEffect } from 'react';


import RoleRoute from './roleroute';

import HomePage from './pages/CustomerPage/HomePage/homepage';
import RestaurantListings from './pages/CustomerPage/RestaurantPage/RestaurantListings';
import FoodMenu from './pages/CustomerPage/MenuFoods/newfoodmenu';
import CartView from './pages/CustomerPage/CartPage/CartView';
import MyOrdersPage from './pages/CustomerPage/OrdersPage/MyOrdersPage';
import OrderDetails from './pages/CustomerPage/OrderDetails/OrderDetails';
import LoginPage from './pages/CustomerPage/Login/LoginPage';
import RegisterPage from './pages/CustomerPage/Register/RegisterPage';
import ProfilePage from './pages/CustomerPage/ProfilePage/Profile';
import PartnerRegister from './pages/CustomerPage/PartnerRegister/PartnerRegister';
import DeliveryPartnerRegister from './pages/CustomerPage/DeliveryPartnerRegister/DeliveryPartnerRegister';



import RestaurantDashboard from './pages/RestaurantPages/RestaurantDashboard/RestaurantDashboard';
import RestaurantOrderRequest from './pages/RestaurantPages/OrderRequest/ResturantOrderRequest';
import AddFoodPage from './pages/RestaurantPages/FoodsPage/AddFoodpage';
import BookingsPage from './pages/RestaurantPages/BookingsPage/BookingsPage';
import ResturantOrderDetailsPage from './pages/RestaurantPages/BookingDetails/ResturantOrderDetailsPage';
import ResturantOrderDetailsAfter from './pages/RestaurantPages/BookingDetailsAfter/ResturantOrederAfterDetails';
import RestaurantProfile from './pages/RestaurantPages/RestaurantProfile/RestaurantProfile';




import AdminDashboard from './pages/AdminPages/AdminDashboard/AdminDashboard';
import AdminBookingsPage from './pages/AdminPages/BookingsPage/BookingsPage';
import AdminOrderDetailsPage from './pages/AdminPages/BookingDetails/AdminOrderDetailsPage';
import ManageUsers from './pages/AdminPages/UserMangementPage/ManageUsers';
import ManagePartners from './pages/AdminPages/PartnerManagementPage/ManagePartners';
import ManageDeliveryPartners from './pages/AdminPages/DeliveryPartnerManagementPage/ManageDeliveryPartners';
import ApproveRestaurant from './pages/AdminPages/ApproveRestaurant/ApproveRestaurant';
import AproveDeliveryPartners from './pages/AdminPages/ApproveDeliveryPartners/ApproveDeliveryPartnersPage';



import DeliveryDashboard from './pages/DeliveryPartnerPages/Dashboard/DeliveryDashboard';
import AllOrders from './pages/DeliveryPartnerPages/AllOrders/AllOrders';
import DeliveryOrdersPage from './pages/DeliveryPartnerPages/DeliveryOrdersPage/DeliveryOrdersPage';
import DeliveryTerminal from './pages/DeliveryPartnerPages/DeliveryDetails/DeliveryTerminal';
import DeliveryProfilePage from './pages/DeliveryPartnerPages/ProfilePage/Profile';







function App() {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, user]);

  return (
    <>
        <ToastContainer
      position="top-right"
      autoClose={2000}
      theme="colored"
    />

    <Routes>


      <Route path='/' element={<HomePage/>}/>
      <Route path='/restaurants' element={<RestaurantListings/>}/>
      <Route path='/resturant/:id' element={<FoodMenu/>}/> 
      <Route path='/login' element={<LoginPage/>}/>  
      <Route path='/register' element={<RegisterPage/>}/>


      <Route path='/cart' element={<RoleRoute roles={["user"]}><CartView/></RoleRoute>}/>
      <Route path='/orders' element={<RoleRoute roles={["user"]}><MyOrdersPage/></RoleRoute>}/>
      <Route path='/orders/:id' element={<RoleRoute roles={["user"]}><OrderDetails/></RoleRoute>}/>
      <Route path='/profile' element={<RoleRoute roles={["user"]}><ProfilePage/></RoleRoute>}/>
      <Route path='/restuaurant_register' element={<RoleRoute roles={["user"]}><PartnerRegister/></RoleRoute>}/>
      <Route path='/delivery_partner_register' element={<RoleRoute roles={["user"]}><DeliveryPartnerRegister/></RoleRoute>}/>


      <Route path='/resturant/dashboard' element={<RoleRoute roles={["restaurant"]}><RestaurantDashboard/></RoleRoute>}/>
      <Route path='/resturant/orderrequest' element={<RoleRoute roles={["restaurant"]}><RestaurantOrderRequest/></RoleRoute>}/>
      <Route path='/resturant/addfood' element={<RoleRoute roles={["restaurant"]}><AddFoodPage/></RoleRoute>}/>
      <Route path='/resturant/bookings' element={<RoleRoute roles={["restaurant"]}><BookingsPage/></RoleRoute>}/>
      <Route path='/resturant/bookings/request/:id' element={<RoleRoute roles={["restaurant"]}><ResturantOrderDetailsPage/></RoleRoute>}/>
      <Route path='/resturant/bookings/:id' element={<RoleRoute roles={["restaurant"]}><ResturantOrderDetailsAfter/></RoleRoute>}/>
      <Route path='/resturant/profile' element={<RoleRoute roles={["restaurant"]}><RestaurantProfile/></RoleRoute>}/>


      <Route path='/admin/dashboard' element={<RoleRoute roles={["admin"]}><AdminDashboard /></RoleRoute>}/>
      <Route path='/admin/bookings' element={<RoleRoute roles={["admin"]}><AdminBookingsPage/></RoleRoute>}/>      
      <Route path='/admin/bookings/:id' element={<RoleRoute roles={["admin"]}><AdminOrderDetailsPage/></RoleRoute>}/>
      <Route path='/admin/mangeusers' element={<RoleRoute roles={["admin"]}><ManageUsers /></RoleRoute>}/>
      <Route path='/admin/mangepartners' element={<RoleRoute roles={["admin"]}><ManagePartners /></RoleRoute>}/>
      <Route path='/admin/mangedeliverypartners'  element={<RoleRoute roles={["admin"]}><ManageDeliveryPartners /></RoleRoute>}/>
      <Route path='/admin/approveresturant' element={<RoleRoute roles={["admin"]}><ApproveRestaurant /></RoleRoute>}/>
      <Route path='/admin/approvedeliverypartners' element={<RoleRoute roles={["admin"]}><AproveDeliveryPartners /></RoleRoute>}/>


      <Route path='/delivery/dashboard' element={<RoleRoute roles={["delivery_partner"]}><DeliveryDashboard /></RoleRoute>}/>
      <Route path='/delivery/orders' element={<RoleRoute roles={["delivery_partner"]}><AllOrders /></RoleRoute>}/>
      <Route path='/delivery/waitingOrders' element={<RoleRoute roles={["delivery_partner"]}><DeliveryOrdersPage /></RoleRoute>}/>
      <Route path='/deliveryStatus/:id' element={<RoleRoute roles={["delivery_partner"]}><DeliveryTerminal /></RoleRoute>}/>
      <Route path='/delivery/profile' element={<RoleRoute roles={["delivery_partner"]}><DeliveryProfilePage /></RoleRoute>}/>

    </Routes>
    </>
  )
}

export default App
