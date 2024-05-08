import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTestimonial, getTestimonial } from "../../../Store/ActionCreators/TestimonialActionCreators";
import DataTable from 'react-data-table-component';

export default function Testimonial() {
  const columns = [
    {
      name: 'Id',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Profile',
      selector: row => row.profile,
      sortable: true,
    },
    {
      name: 'Pic',
      selector: row => <a href={`${process.env.REACT_APP_SERVER}/${row.pic}`} target="_blank" rel="noreferrer"><img src={`/${row.pic}`} height="50px" width="50px"></img></a>,
      sortable: true,
    },
    {
      name: 'Message',
      selector: row => row.message.slice(0,50),
      sortable: true,
    },
    {
      name: 'Edit',
      sortable: false,
      selector:row =><Link to={`/admin/testimonial/update/${row._id}`}><i className='fa fa-edit text-success'></i></Link>
    },
    {
      name: 'Delete',
      sortable: false,
      selector:row => <button className='btn' onClick={()=>deleteItem(row._id)}><i className="fa fa-trash text-danger"></i></button>
    },
  ];
     let[data,setData] = useState([])
     let  dispatch = useDispatch()
     let TestimonialStateData = useSelector((state)=>state.TestimonialStateData)
     function deleteItem(_id){
       if(window.confirm("Are You Sure!!! want to Delete this item? ")){ 
         dispatch(deleteTestimonial({_id:_id}))
        getAPIData()
     }
    }
     function getAPIData(){
         dispatch(getTestimonial())
         if(TestimonialStateData.length){
          setData(TestimonialStateData)
         }
     }
    useEffect(()=>{
        getAPIData()
    },[TestimonialStateData.length])
  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="btn-color text-light p-2 text-center">Testimonial <Link to="/admin/testimonial/create"><i className="fa fa-plus text-light float-end"></i> </Link></h5>
            <div className='table-responsive'>  
            {/* <table className='table table-bordered'>
               <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Profile</th>
                  <th>Pic</th>
                  <th>Message</th>
                  <th></th>
                  <th></th>
                </tr>
               </thead>
               <tbody>
                   {
                       data.map((item,index)=>{
                       return <tr key={index}>
                           <td>{item._id}</td>
                           <td>{item.name}</td>
                           <td>{item.profile}</td>
                           <td><img src={`/${item.pic}`} height="80px" width="80px"></img></td>
                           <td>{item.message.slice(0,200)+"..."}</td>
                           <td><Link to={`/admin/testimonial/update/${item._id}`}><i className='fa fa-edit text-success'></i></Link></td>
                           <td><button className='btn' onClick={()=>deleteItem(item._id)}><i className="fa fa-trash text-danger"></i></button></td>
                        </tr>
                    })
                   }
               </tbody>
            </table> */}
            <DataTable
                  className="table"
			            columns={columns}
		            	data={data}
                  pagination = {true}
		          />

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
