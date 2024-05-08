import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubcategory } from "../Store/ActionCreators/SubcategoryActionCreators";
import { Link } from "react-router-dom";



const ClientSidebar = () => {
  let dispatch = useDispatch();
  let SubcategoryStateData = useSelector((state)=>state.SubcategoryStateData)
 
useEffect(() => {
  dispatch(getSubcategory())
},[dispatch])
  return (
    <>
      <div className="list-group mb-3  ">
        <div
          // style={{ background: "#6068bf" }}
          className="list-group-item btn-color text-light "
        >
          All Categories
        </div>
        <div
          className="list-group "
          style={{ height: "24rem", overflow: "auto" }}
        >
           {
            SubcategoryStateData.map((item,index) => (
              <Link
                key={index}
                // to={`/shop/${item.maincat}/${item._id}`}
                to={`/shop`}
            className="list-group-item list-group-item-action"
               >
              <span className="float-start">{item.name}</span>
              </Link>
            ))
           }
        </div>
      </div>
    </>
  );
};

export default ClientSidebar;
