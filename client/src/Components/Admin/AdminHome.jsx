import React, { useEffect, useState } from 'react'
import Sidebar  from './Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { apiLink } from '../../utils/utils'

export default function AdminHome() {
  let [user,setUser] = useState({})
  let navigate = useNavigate()
  async function getApiData(){
      let response = await fetch (`${apiLink}/api/user/`+localStorage.getItem("userid"),{
          method:"get",
          headers:{
              "content-type":"application/json",
              "Authorization": localStorage.getItem("token")
          }
      })
      response = await response.json()
      if(response.status === 200)
      setUser(response.data)
      else
      navigate("/login")
  }
  useEffect(()=>{
        getApiData()
  },[])
  return (
    <>
      <div className="container-fluid my-3" >
        <div className="row">
            <div className="col-md-3">
                 <Sidebar/>
            </div>
            <div className="col-md-9">
              <h5 className='btn-color text-light p-2 text-center'>Admin</h5>
              <div className="row">
                <div className="col-md-6">
                {
                        user.pic?
                        <img src= {`${apiLink}/${user.pic}`} height="360px" width="100%" alt="" />:
                        <img src={`/img/nouser.png`}height="360px" width="100%" alt="" />
                    }
                </div>
                <div className="col-md-6">
                    <table className='table table-bordered'>
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
                                <td  colSpan={2}><Link to="/update-profile" className='btn btn-color text-light w-100'>Update Profile</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}
