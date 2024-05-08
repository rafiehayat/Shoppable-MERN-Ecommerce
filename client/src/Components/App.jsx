import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Footer from "./Footer";
import About from "./About";
import Contact from "./Contact";
import Error from "./Error";
import Shop from "./Shop";
import SingleProduct from "./SingleProduct";
import AdminHome from "./Admin/AdminHome";

import MainCategory from "./Admin/Maincategory/Maincategory";
import CreateMainCategory from "./Admin/Maincategory/CreateMaincategory";
import UpdateMaincategory from "./Admin/Maincategory/UpdateMaincategory";

import SubCategory from "./Admin/Subcategory/Subcategory";
import CreateSubCategory from "./Admin/Subcategory/CreateSubcategory";
import UpdateSubcategory from "./Admin/Subcategory/UpdateSubcategory";

import Brand from "./Admin/Brand/Brand";
import CreateBrand from "./Admin/Brand/CreateBrand";
import UpdateBrand from "./Admin/Brand/UpdateBrand";

import Product from "./Admin/Product/Product";
import CreateProduct from "./Admin/Product/CreateProduct";
import UpdateProduct from "./Admin/Product/UpdateProduct";
import User from "./Admin/User/User";

import Testimonial from "./Admin/Testimonial/Testimonial";
import CreateTestimonial from "./Admin/Testimonial/CreateTestimonial";
import UpdateTestimonial from "./Admin/Testimonial/UpdateTestimonial";

import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import Newsletter from "./Admin/Newsletter/Newsletter";
import ContactUs from "./Admin/ContactUS/ContactUs";
import ShowContact from "./Admin/ContactUS/ShowContact";
import ShowCheckout from "./Admin/Checkout/ShowCheckout";
import AdminCheckout from "./Admin/Checkout/AdminCheckout";
import ForgetPassword1 from "./ForgetPassword1";
import ForgetPassword2 from "./ForgetPassword2";
import ForgetPassword3 from "./ForgetPassword3";
import Order from "./Order";
import Wishlist from "./Wishlist";
import Payment from "./Payment";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:_id" element={<SingleProduct />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/testimonials" element={<Testimonial/>}/>
        <Route path="/forget-password-1" element={<ForgetPassword1/>}/>
        <Route path="/forget-password-2" element={<ForgetPassword2/>}/>
        <Route path="/forget-password-3"  element={<ForgetPassword3/>}/>

        <Route path="/profile" element={ localStorage.getItem("login")?<Profile />:<Login/>} />
        <Route path="/order" element={ localStorage.getItem("login")?<Order />:<Login/>} />
        <Route path="/update-profile" element={ localStorage.getItem("login")?<UpdateProfile />:<Login/>} />
        <Route path="/cart" element={ localStorage.getItem("login")?<Cart/>:<Login/>}/>
        <Route path="/wishlist" element={ localStorage.getItem("login")?<Wishlist/>:<Login/>}/>
        <Route path="/checkout" element={ localStorage.getItem("login")?<Checkout/>:<Login/>}/>
        <Route path="/confirmation" element={ localStorage.getItem("login")?<Confirmation/>:<Login/>}/>
        <Route path="/payment/:_id" element={ localStorage.getItem("login")?<Payment />:<Login/>} />
        
        <Route path="/admin" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<AdminHome />:<Profile/>:<Login/>} />

        <Route path="/admin/maincategory" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<MainCategory />:<Profile/>:<Login/>} />
        <Route path="/admin/maincategory/create" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<CreateMainCategory />:<Profile/>:<Login/>} />
        <Route path="/admin/maincategory/update/:_id" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<UpdateMaincategory />:<Profile/>:<Login/>}/>

        <Route path="/admin/subcategory" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<SubCategory />:<Profile/>:<Login/>} />
        <Route path="/admin/subcategory/create" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<CreateSubCategory />:<Profile/>:<Login/>}/>
        <Route path="/admin/subcategory/update/:_id" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<UpdateSubcategory />:<Profile/>:<Login/>}/>

        <Route path="/admin/brand" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<Brand />:<Profile/>:<Login/>} />
        <Route path="/admin/brand/create" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<CreateBrand />:<Profile/>:<Login/>} />
        <Route path="/admin/brand/update/:_id" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<UpdateBrand />:<Profile/>:<Login/>} />

        <Route path="/admin/product" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<Product />:<Profile/>:<Login/>} />
        <Route path="/admin/product/create" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<CreateProduct />:<Profile/>:<Login/>} />
        <Route path="/admin/product/update/:_id" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<UpdateProduct />:<Profile/>:<Login/>} />

        <Route path="/admin/testimonials" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<Testimonial />:<Profile/>:<Login/>} />
        <Route path="/admin/testimonial/create" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<CreateTestimonial />:<Profile/>:<Login/>}/>
        <Route path="/admin/testimonial/update/:_id" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<UpdateTestimonial />:<Profile/>:<Login/>}/>
         
         <Route path="/admin/newsletter" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<Newsletter/>:<Profile/>:<Login/>}/>
         <Route path="/admin/contactus" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<ContactUs/>:<Profile/>:<Login/>}/>
         <Route path="/admin/contactus/show/:_id" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<ShowContact/>:<Profile/>:<Login/>}/>
         <Route path="/admin/checkout" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<AdminCheckout/>:<Profile/>:<Login/>}/>
         <Route path="/admin/checkout/show/:_id" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<ShowCheckout/>:<Profile/>:<Login/>}/>
         <Route path="/admin/users" element={localStorage.getItem("login")?localStorage.getItem("role") === "Admin"?<User />:<Profile/>:<Login/>} />

        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
