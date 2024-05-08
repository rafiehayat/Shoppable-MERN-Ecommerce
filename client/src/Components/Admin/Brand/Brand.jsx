import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getBrand } from "../../../Store/ActionCreators/BrandActionCreators";
import DataTable from 'react-data-table-component';

export default function Brand() {
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
      name: 'Edit',
      sortable: false,
      selector:row => <Link to={`/admin/brand/update/${row._id}`}><i className='fa fa-edit text-success'></i></Link>
    },
    {
      name: 'Delete',
      sortable: false,
      selector:row => <button className='btn' onClick={()=>deleteItem(row._id)}><i className="fa fa-trash text-danger"></i></button>
    },
  ];
     let[data,setData] = useState([])
     let  dispatch = useDispatch()
     let BrandStateData = useSelector((state)=>state.BrandStateData)
     function deleteItem(_id){
       if(window.confirm("Are You Sure!!! want to Delete this item? ")){ 
         dispatch(deleteBrand({_id:_id}))
        getAPIData()
     }
    }
     function getAPIData(){
         dispatch(getBrand())
         if(BrandStateData.length){
          setData(BrandStateData)
         }
     }
    useEffect(()=>{
        getAPIData()
    },[BrandStateData.length])
  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="btn-color text-light p-2 text-center">Brand <Link to="/admin/brand/create"><i className="fa fa-plus text-light float-end"></i> </Link></h5>
            <div className='table-responsive'>  
            <DataTable
                  className="table"
			            columns={columns}
		            	data={data}
                  pagination = {true}
                  load
		          />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
