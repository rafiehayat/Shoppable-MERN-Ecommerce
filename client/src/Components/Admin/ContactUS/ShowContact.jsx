import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteContactUs, getContactUs, updateContactUs } from "../../../Store/ActionCreators/ContactUsActionCreators";

export default function ShowContact() {
  let {_id} = useParams()
     let [data,setData] = useState([])
     let  dispatch = useDispatch()
     let navigate = useNavigate()
     let ContactUsStateData = useSelector((state) => state.ContactUsStateData)

     function updateItem(){
            dispatch(updateContactUs({...data, active:false}))
            setData((old)=>{
               return{
                  ...old,
                  'active': false
               }
            })
     }
     
     function deleteItem(){
       if(window.confirm("Are You Sure!!! want to Delete this item? ")){ 
         dispatch(deleteContactUs({ _id: _id }))
         getAPIData()
     }
      navigate("/admin/contactus")
    }
     function getAPIData(){
         dispatch(getContactUs())
         if(ContactUsStateData.length){
          setData(ContactUsStateData.find((x) => x._id === _id))
         }
     }
    useEffect(()=>{
        getAPIData()
    },[ContactUsStateData.length])
  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="btn-color text-light p-2 text-center">ContactUs Query</h5>
              <table className="table table-bordered table-striped table-hover">
                   <tbody>
                    <tr>
                       <th>ID</th>
                       <th>{data._id}</th>
                    </tr>
                    <tr>
                       <th>Name</th>
                       <th>{data.name}</th>
                    </tr>
                    <tr>
                       <th>Email</th>
                       <th>{data.email}</th>
                    </tr>
                    <tr>
                       <th>Phone</th>
                       <th>{data.phone}</th>
                    </tr>
                    <tr>
                       <th>Subject</th>
                       <th>{data.subject}</th>
                    </tr>
                    <tr>
                       <th>Message</th>
                       <th>{data.message}</th>
                    </tr>
                    <tr>
                       <th>Date</th>
                       <th>{new Date(data.date).toLocaleDateString()}</th>
                    </tr>
                    <tr>
                       <th>Status</th>
                       <th>{data.active?"Active":"Inactive"}</th>
                    </tr>
                    <tr>
                       <td colSpan={2}>
                        {
                          data.active === true ?
                          <button className="btn btn-color text-light w-100" onClick={updateItem}>Update Status to Done</button>:
                          <button className="btn btn-danger w-100" onClick={deleteItem}>Delete</button>
                        }
                       </td>
                    </tr>
                   </tbody>
              </table>
          </div>
        </div>
      </div>
    </>
  );
}
