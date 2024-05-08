import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiLink } from '../utils/utils'


export default function ForgetPassword1() {
     let[data,setData] = useState({
        username: ""
     })
     let [show,setShow] = useState(false)
     let navigate = useNavigate()
     function getInputData(e){
        var {name, value} = e.target
        setData((old ) => {
            return{
                ...old,
                [name] : value
            }
        })
     }
    async function postData(e){
        e.preventDefault()
        let response = await fetch(`${apiLink}/api/user/forget-password-1`,{
            method:"post",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({username : data.username})
        })
         response = await response.json()
         if(response.status === 200){
             localStorage.setItem("password-reset-username", data.username)
               navigate("/forget-password-2")
         }
         else{
            setShow(true)
         }
     }
  return (
    <>
      <div className="container-fluid my-3">
        <div className="w-75 m-auto">
            <h5 className='text-center btn-color p-2 text-light'><span className='text-warning fs-4'>Reset</span> Password</h5>
            <form onSubmit={postData}>
                <div className="mb-3">
                    <label>Username</label>
                    <input type="text" name='username' onChange={getInputData} placeholder='User name or email' className='form-control' />
                    {
                      show?<p className='text-danger'>Invalid OTP </p>:""
                    }
                </div>
                <div className="mb-3">
                    <div className="btn-group w-100">
                        <Link to="/login" className='btn btn-success' >Login</Link>
                        <button type='submit' className='btn btn-color text-light'>Send OTP</button>
                    </div>
                </div>
            </form>
        </div>
      </div>
    </>
  )
}
