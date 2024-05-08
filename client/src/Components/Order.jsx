import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCheckout } from "../Store/ActionCreators/CheckoutActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import { apiLink } from '../utils/utils'
export default function Order() {
    let [user,setUser] = useState({})
    let [orders,setOrders]  = useState([])
    let navigate = useNavigate()
    let dispatch = useDispatch()

    let CheckoutStateData = useSelector((state) => state.CheckoutStateData)

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

        dispatch(getCheckout())
        
        if(CheckoutStateData.length){
            setOrders(CheckoutStateData)
        }
    }
    useEffect(()=>{
          getAPIData()
    },[CheckoutStateData.length])
  return (
    <>
         <div className="container-fluid my-3">
            {
                orders.length?
                <>
                 {
                    orders.map((item,index) => {
                        return  <div className="row" key={index}>
                       <div className="col-md-4">
                            <div className="table-responsive">
                                <table className='table table-bordered table-striped table-hover'>
                                    <tbody>
                                        <tr>
                                            <th>Order Id</th>
                                            <td>{item._id}</td>
                                        </tr>
                                        <tr>
                                            <th>Order Status</th>
                                            <td>{item.orderstatus}</td>
                                        </tr>
                                        <tr>
                                            <th>Order Id</th>
                                            <td>{item._id}</td>
                                        </tr>
                                        <tr>
                                            <th>Payment Mode</th>
                                            <td>{item.paymentmode}</td>
                                        </tr>
                                        <tr>
                                            <th>Payment Status</th>
                                            <td>{item.paymentstatus}
                                            <br />
                                            {item.paymentmode!=="COD" && item.paymentstatus==="Pending"?<Link to={`/payment/${item._id}`} className='btn btn-color text-light'>Pay Now</Link>:""}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Subtotal</th>
                                            <td>&#8377;{item.subtotal}</td>
                                        </tr>
                                        <tr>
                                            <th>Shipping</th>
                                            <td>&#8377;{item.shipping}</td>
                                        </tr>
                                        <tr>
                                            <th>Total</th>
                                            <td>&#8377;{item.total}</td>
                                        </tr>
                                        <tr>
                                            <th>Date</th>
                                            <td>{new Date(item.date).toLocaleDateString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                       </div>
                       <div className="col-md-8">
                       <table className='table table-bordered table-striped table-hover'>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Color/Size</th>
                                <th>Price</th>
                                <th>QTY</th>
                                <th>Total</th>
                            </tr>
                            {
                                item.products.map((item,index) =>{
                                     return  <tr key={index}>
                                     <td>
                                        <a href={`/${item.pic}`} target='_blank' rel= 'noreferrer'>
                                            <img src={`/${item.pic}`} height="80px" width="80px" className='rounded-1' alt="" />
                                        </a>
                                     </td>
                                     <td>{item.name}</td>
                                     <td>{item.brand}</td>
                                     <td>{item.color}/{item.size}</td>
                                     <td>&#8377;{item.price}</td>
                                     <td>&#8377;{item.qty}</td>
                                     <td>&#8377;{item.total}</td>
                                  </tr>    
                                })
                            }
                        </tbody>
                      </table>
                       </div>
                       <hr style={{border:"5px solid red"}} />
                     </div>
                    })
                  }
                </>:
                <div className='text-center p-5'>
                    <p>No Order History Found</p>
                    <Link to="/shop" className='btn btn-color text-light'>Shop Now</Link>
                </div>
            }
         </div>
    </>
  )
}
