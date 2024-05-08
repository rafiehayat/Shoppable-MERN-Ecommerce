import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { deleteWishlist, getWishlist } from "../Store/ActionCreators/WishlistActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import { apiLink } from '../utils/utils'
export default function Wishlist() {
    let [user,setUser] = useState({})
    let [wishlist,setWishlist] = useState([])
    let navigate = useNavigate()
    let dispatch = useDispatch()

    let WishlistStateData = useSelector((state) => state.WishlistStateData)
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
        if(WishlistStateData.length){
            setWishlist(WishlistStateData)
        }
       
    }
    useEffect(()=>{
          getAPIData()
    },[WishlistStateData.length])
  return (
    <>
         <div className="container-fluid my-3">
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
