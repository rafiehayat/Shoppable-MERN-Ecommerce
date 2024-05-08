import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteNewsletter, getNewsletter } from "../../../Store/ActionCreators/NewsletterActionCreators";
import DataTable from 'react-data-table-component';

export default function Newsletter() {
  const columns = [
    {
      name: 'Id',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Delete',
      sortable: false,
      selector:row => <button className='btn' onClick={()=>deleteItem(row._id)}><i className="fa fa-trash text-danger"></i></button>
    },
  ];
     let[data,setData] = useState([])
     let  dispatch = useDispatch()
     let NewsletterStateData = useSelector((state)=>state.NewsletterStateData)
     function deleteItem(_id){
       if(window.confirm("Are You Sure!!! want to Delete this item? ")){ 
         dispatch(deleteNewsletter({_id:_id}))
        getAPIData()
     }
    }
     function getAPIData(){
         dispatch(getNewsletter())
         if(NewsletterStateData.length){
          setData(NewsletterStateData)
         }
     }
    useEffect(()=>{
        getAPIData()
    },[NewsletterStateData.length])
  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="btn-color text-light p-2 text-center">Newsletter</h5>
            <div className='table-responsive'>  
            {/* <table className='table table-bordered'>
               <thead>
                <tr>
                  <th>Id</th>
                  <th>Email</th>
                  <th></th>
                </tr>
               </thead>
               <tbody>
                   {
                       data.map((item,index)=>{
                       return <tr key={index}>
                           <td>{item._id}</td>
                           <td>{item.email}</td>
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
