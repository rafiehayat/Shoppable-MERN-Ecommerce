import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { deleteWishlist, getWishlist } from "../Store/ActionCreators/WishlistActionCreators"
import { getCheckout } from "../Store/ActionCreators/CheckoutActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import { apiLink } from '../utils/utils'
export default function Profile() {
    let [user,setUser] = useState({})
    let [wishlist,setWishlist] = useState([])
    let [orders,setOrders]  = useState([])
    let navigate = useNavigate()
    let dispatch = useDispatch()

    let WishlistStateData = useSelector((state) => state.WishlistStateData)
    let CheckoutStateData = useSelector((state) => state.CheckoutStateData)
    function deleteItem(_id){
        if(window.confirm("You Want to Remove This Item From Wishlist?")){
            dispatch(deleteWishlist({_id:_id}))
            getAPIData()
        }
    }
    async function getAPIData(){
        let response = await fetch (`${apiLink}/api/user/`+localStorage.getItem("userid"),{
            method:"get",
            headers:{
                "content-type":"application/json",
                "Authorization": localStorage.getItem("token")
            }
        })
        response = await response.json()
        if(response.status!== 200)
        navigate("/login")
        else
        setUser(response.data)

        dispatch(getWishlist())
        dispatch(getCheckout())
        if(WishlistStateData.length){
            setWishlist(WishlistStateData)
        }
        if(CheckoutStateData.length){
            setOrders(CheckoutStateData)
        }
    }
    useEffect(()=>{
          getAPIData()
    },[WishlistStateData.length,CheckoutStateData.length])
  return (
    <>
         <div className="container-fluid my-3">
            <div className="row">
                <div className="col-md-6">
                    {
                        user.pic?
                        <img src= {`${apiLink}/${user.pic}`} height="400px" width="100%" alt="" />:
                        <img src={`/img/nouser.png`}height="400px" width="100%" alt="" />
                    }
                </div>
                <div className="col-md-6">
                    <table className='table table-bordered table-striped table-hover'>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{user.name}</td>
                            </tr>
                            <tr>
                                <th>UserName</th>
                                <td>{user.username}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>{user.phone}</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>{user.address}</td>
                            </tr>
                            <tr>
                                <th>PIN</th>
                                <td>{user.pin}</td>
                            </tr>
                            <tr>
                                <th>City</th>
                                <td>{user.city}</td>
                            </tr>
                            <tr>
                                <th>State</th>
                                <td>{user.state}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}><Link to="/update-profile" className='btn btn-color text-light w-100'>Update</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <h5 className='text-center btn-color p-2 text-light'>Wishlist Section</h5>
            {
                wishlist.length?
                <div className="table-responsive">
                      <table className='table table-bordered table-striped table-hover'>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Color/Size</th>
                                <th>Price</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                            {
                                wishlist.map((item,index) =>{
                                     return  <tr key={index}>
                                     <td>
                                        <a href={`${apiLink}/${item.pic}`} target='_blank' rel= 'noreferrer'>
                                            <img src={`${apiLink}/${item.pic}`} height="80px" width="80px" className='rounded-1' alt="" />
                                        </a>
                                     </td>
                                     <td>{item.name}</td>
                                     <td>{item.brand}</td>
                                     <td>{item.color}/{item.size}</td>
                                     <td>&#8377;{item.price}</td>
                                     <td><Link to={`/product/${item.productid}`}><i className='fa fa-shopping-cart text-success'></i></Link></td>
                                     <td><button className='btn ' onClick={() => deleteItem(item._id)}><i className='fa fa-trash text-primary'></i></button></td>
                                     <td></td>
                              </tr>
                                     
                                })
                            }
                        </tbody>
                      </table>
                </div>:
                <div className='text-center p-5'>
                    <p>No Items in Wishlist</p>
                    <Link to="/shop" className='btn btn-color text-light'>Shop Now</Link>
                </div>
            }
         </div>
    </>
  )
}
