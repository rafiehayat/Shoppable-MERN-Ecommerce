import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import formValidation from "../../CustomValidation/formValidation"
import { updateProduct, getProduct } from "../../../Store/ActionCreators/ProductActionCreators";
import { getMaincategory } from "../../../Store/ActionCreators/MaincategoryActionCreators";
import { getBrand } from "../../../Store/ActionCreators/BrandActionCreators";
import { getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators";


export default function UpdateProduct() {
  let [errorMessage,setErrorMessage] = useState({
    name: "",
    color: "",
    size: "",
    baseprice: "",
    discount: "",
    pic1: "",
  })
  let [show , setShow] = useState(false)
  let [data,setData] = useState({});
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { _id } = useParams()
  let [maincategory,setMaincategory] = useState([])
  let [subcategory,setSubcategory] = useState([])
  let [brand,setBrand] = useState([])

  let MaincategoryStateData = useSelector((state)=> state.MaincategoryStateData)
  let SubcategoryStateData = useSelector((state)=> state.SubcategoryStateData)
  let BrandStateData = useSelector((state)=> state.BrandStateData)
  let ProductStateData = useSelector((state)=> state.ProductStateData)
  function getInputData(e) {
    let {name,value} = e.target
    setErrorMessage((old) => {
      return{
         ...old,
        [name] : formValidation(e)
      }
   })
    setData((old)=>{
      return{
        ...old,
        [name]:value
      }
    })
  }
  function getInputFile(e){
        let { name, files } = e.target
        setData((old)=>{
          return {
            ...old,
            [name] : files[0]
          }
        })
  }
  async function postData(e) {
       e.preventDefault()
       let error = Object.keys(errorMessage).find(x =>errorMessage[x] && errorMessage[x].length !== 0)
      if(!error) {
        let fp = Math.round(data.baseprice-data.baseprice * data.discount / 100)
         var item = new FormData()
         item.append("_id",_id)
         item.append("name",data.name)
         item.append("maincategory",data.maincategory || maincategory[0].name)
         item.append("subcategory",data.subcategory || subcategory[0].name )
         item.append("brand",data.brand || brand[0].name)
         item.append("color",data.color)
         item.append("size", data.size)
         item.append("baseprice", parseInt(data.baseprice))
         item.append("discount", parseInt(data.discount))
         item.append("finalprice",fp)
         item.append("stock",data.stock)
         item.append("description",data.description)
         item.append("pic1",data.pic1)
         item.append("pic2",data.pic2)
         item.append("pic3",data.pic3)
         item.append("pic4",data.pic4)
         dispatch(updateProduct(item))
         navigate("/admin/product")
      }
      else
          setShow(true)
  }
  function getAPIData(){
    dispatch(getMaincategory())
    dispatch(getSubcategory())
    dispatch(getBrand())
   if(MaincategoryStateData.length)
        setMaincategory(MaincategoryStateData)
   if(SubcategoryStateData.length)
        setSubcategory(SubcategoryStateData)
   if(BrandStateData.length)
        setBrand(BrandStateData)

     dispatch(getProduct())
     if(ProductStateData.length){
           let item = ProductStateData.find((x)=>x._id=== _id)
         if(item)
           setData({...item})
     }
  }
  useEffect(()=>{
      getAPIData()
  },[ProductStateData.length,MaincategoryStateData.length,SubcategoryStateData.length,BrandStateData.length])
  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="btn-color text-light p-2 text-center">
              Product
            </h5>
            <form onSubmit={postData}>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={getInputData}
                  className="form-control"
                  placeholder="Name"
                />
                {
                  show? <p className="text-danger">{errorMessage.name}</p>:""
                }
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                 <label>Maincategory</label>
                 <select name="maincategory" value={data.maincategory} onChange={getInputData} className="form-control">
                  {
                    maincategory.map((item,index)=>{
                       return <option key={index} value={item.name}>{item.name}</option>
                    })
                  }
                 </select>
             </div>
             <div className="col-md-3 mb-3">
                 <label>Subcategory</label>
                 <select name="subcategory" value={data.subcategory} onChange={getInputData} className="form-control">
                  {
                    subcategory.map((item,index)=>{
                       return <option key={index} value={item.name}>{item.name}</option>
                    })
                  }
                 </select>
             </div>
             <div className="col-md-3 mb-3">
                 <label>Brand</label>
                 <select name="brand" value={data.brand} onChange={getInputData} className="form-control">
                  {
                    brand.map((item,index)=>{
                       return <option key={index} value={item.name}>{item.name}</option>
                    })
                  }
                 </select>
             </div>
             <div className="col-md-3 mb-3">
                 <label>Stock</label>
                 <select name="stock" value={data.stock} onChange={getInputData} className="form-control">
                     <option value="In Stock">In Stock</option>
                     <option value="Out Of Stock">Out Of Stock</option>
                 </select>
             </div>
              </div>
              <div className="row">
                 <div className="col-md-6 mb-3">
                   <label>Color</label>
                   <input type="text" name="color" value={data.color} placeholder="color" onChange={getInputData}  className="form-control"/>
                {
                  show? <p className="text-danger">{errorMessage.color}</p>:""
                }
                 </div>
                 <div className="col-md-6 mb-3">
                   <label>Size</label>
                   <input type="text" name="size" value={data.size} placeholder="size" onChange={getInputData}  className="form-control"/>
                   {
                    show? <p className="text-danger">{errorMessage.size}</p>:""
                   }
                 </div>
              </div>
              <div className="row">
                 <div className="col-md-6 mb-3">
                   <label>Base Price</label>
                   <input type="number" name="baseprice" value={data.baseprice} placeholder="Base Price" onChange={getInputData}  className="form-control"/>
                   {
                    show? <p className="text-danger">{errorMessage.baseprice}</p>:""
                  }
                 </div>
                 <div className="col-md-6 mb-3">
                   <label>Discount</label>
                   <input type="number" name="discount" value={data.discount} placeholder="Discount" min={0} onChange={getInputData}  className="form-control"/>
                   {
                  show? <p className="text-danger">{errorMessage.discount}</p>:""
                }
                 </div>
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea name="description"  rows="5" value={data.description} className="form-control" placeholder="Description..." onChange={getInputData}></textarea>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Pic1</label>
                  <input type="file" name="pic1" onChange={getInputFile} className="form-control"/>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pic2</label>
                  <input type="file" name="pic2" onChange={getInputFile} className="form-control"/>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pic3</label>
                  <input type="file" name="pic3" onChange={getInputFile} className="form-control"/>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pic4</label>
                  <input type="file" name="pic4" onChange={getInputFile} className="form-control"/>
                </div>
              </div>
              <div className="mb-3">
                <button type="button" className="btn btn-success w-50"onClick={() => window.history.back()}>Back</button>
                <button type="submit" className="btn btn-color text-light w-50"> Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}



// import React, { useState, useEffect, useMemo } from "react";
// import { Link, useLocation, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getProduct } from "../Store/ActionCreators/ProductActionCreators";
// import { getMaincategory } from "../Store/ActionCreators/MaincategoryActionCreators";
// import { getSubcategory } from "../Store/ActionCreators/SubcategoryActionCreators";
// import { getBrand } from "../Store/ActionCreators/BrandActionCreators";

// export default function Shop() {
//   var [flag, setFlag] = useState(false);
//   var [product, setProduct] = useState([]);
//   let [min, setMin] = useState(0);
//   let [max, setMax] = useState(1000);
//   var [priceFilter, setPriceFilter] = useState("None");
//   var [activeButton, setActiveButton] = useState("allCategory");
//   var dispatch = useDispatch();
//   var allProducts = useSelector((state) => state.ProductStateData);
//   var allMaincategories = useSelector((state) => state.MaincategoryStateData);
//   var allSubcategories = useSelector((state) => state.SubcategoryStateData);
//   var allBrands = useSelector((state) => state.BrandStateData);
//   var { maincat, subcat, brnd } = useParams();
//   var [mc, setMc] = useState("All");
//   var [sc, setSc] = useState("All");
//   var [br, setBr] = useState("All");
//   function useQuery() {
//     const { search } = useLocation();
//     return useMemo(() => new URLSearchParams(search), [search]);
//   }
//   let query = useQuery();
//   function filterData(mc, sc, br, priceFilter, min = -1, max = -1) {
//     if (priceFilter === "None") {
//       if (mc === "All" && sc === "All" && br === "All") setProduct(allProducts);
//       else if (mc !== "All" && sc === "All" && br === "All")
//         setProduct(allProducts.filter((x) => x.maincategory === mc));
//       else if (mc === "All" && sc !== "All" && br === "All")
//         setProduct(allProducts.filter((x) => x.subcategory === sc));
//       else if (mc === "All" && sc === "All" && br !== "All")
//         setProduct(allProducts.filter((x) => x.brand === br));
//       else if (mc !== "All" && sc !== "All" && br === "All")
//         setProduct(
//           allProducts.filter(
//             (x) => x.maincategory === mc && x.subcategory === sc
//           )
//         );
//       else if (mc !== "All" && sc === "All" && br !== "All")
//         setProduct(
//           allProducts.filter((x) => x.maincategory === mc && x.brand === br)
//         );
//       else if (mc === "All" && sc !== "All" && br !== "All")
//         setProduct(
//           allProducts.filter((x) => x.brand === br && x.subcategory === sc)
//         );
//       else
//         setProduct(
//           allProducts.filter(
//             (x) =>
//               x.maincategory === mc && x.subcategory === sc && x.brand === br
//           )
//         );
//       if (min === -1 && max === -1) setProduct(allProducts);
//       else
//         setProduct(
//           allProducts.filter((x) => x.finalprice >= min && x.finalprice <= max)
//         );
//     } else {
//       var min = 0;
//       var max = 0;
//       if (priceFilter === "first") {
//         min = 0;
//         max = 1000;
//       } else if (priceFilter === "second") {
//         min = 1001;
//         max = 2000;
//       } else if (priceFilter === "third") {
//         min = 2001;
//         max = 3000;
//       } else if (priceFilter === "fourth") {
//         min = 3001;
//         max = 4000;
//       } else if (priceFilter === "fifth") {
//         min = 4001;
//         max = 5000;
//       } else {
//         min = 5001;
//         max = 989898000;
//       }
//       if (mc === "All" && sc === "All" && br === "All")
//         setProduct(
//           allProducts.filter((x) => x.finalprice >= min && x.finalprice <= max)
//         );
//       else if (mc !== "All" && sc === "All" && br === "All")
//         setProduct(
//           allProducts.filter(
//             (x) =>
//               x.maincategory === mc &&
//               x.finalprice >= min &&
//               x.finalprice <= max
//           )
//         );
//       else if (mc === "All" && sc !== "All" && br === "All")
//         setProduct(
//           allProducts.filter(
//             (x) =>
//               x.subcategory === sc && x.finalprice >= min && x.finalprice <= max
//           )
//         );
//       else if (mc === "All" && sc === "All" && br !== "All")
//         setProduct(
//           allProducts.filter(
//             (x) => x.brand === br && x.finalprice >= min && x.finalprice <= max
//           )
//         );
//       else if (mc !== "All" && sc !== "All" && br === "All")
//         setProduct(
//           allProducts.filter(
//             (x) =>
//               x.maincategory === mc &&
//               x.subcategory === sc &&
//               x.finalprice >= min &&
//               x.finalprice <= max
//           )
//         );
//       else if (mc !== "All" && sc === "All" && br !== "All")
//         setProduct(
//           allProducts.filter(
//             (x) =>
//               x.maincategory === mc &&
//               x.brand === br &&
//               x.finalprice >= min &&
//               x.finalprice <= max
//           )
//         );
//       else if (mc === "All" && sc !== "All" && br !== "All")
//         setProduct(
//           allProducts.filter(
//             (x) =>
//               x.brand === br &&
//               x.subcategory === sc &&
//               x.finalprice >= min &&
//               x.finalprice <= max
//           )
//         );
//       else
//         setProduct(
//           allProducts.filter(
//             (x) =>
//               x.maincategory === mc &&
//               x.subcategory === sc &&
//               x.brand === br &&
//               x.finalprice >= min &&
//               x.finalprice <= max
//           )
//         );
//     }
//   }
//   function getPriceFilter(e) {
//     var { name, value } = e.target;
//     if (name === "min") setMin(value);
//     else setMax(value);
//   }
//   function applyPriceFilter() {
//     filterData(mc, sc, br, min, max);
//   }
//   function getSelected(x, y, z) {
//     setMc(x);
//     setSc(y);
//     setBr(z);
//     filterData(x, y, z, priceFilter);
//   }
//   function sortBy(input) {
//     if (input === "Newest") product.sort((x, y) => y.id - x.id);
//     else if (input === "HTOL")
//       product.sort((x, y) => y.finalprice - x.finalprice);
//     else product.sort((x, y) => x.finalprice - y.finalprice);

//     setProduct(product);
//     setFlag(!flag);
//   }
//   function getInputData(e) {
//     setPriceFilter(e.target.value);
//     filterData(mc, sc, br, e.target.value);
//   }
//   function getAPIData() {
//     dispatch(getProduct());
//     dispatch(getMaincategory());
//     dispatch(getSubcategory());
//     dispatch(getBrand());
//     if (query.get("search")) searchPage();
//     else if (allProducts.length) filterData(maincat, subcat, brnd, priceFilter);
//   }
//   function searchPage() {
//     var search = query.get("search").toLocaleLowerCase();
//     var p = allProducts.filter(
//       (x) =>
//         x.name.toLowerCase().search(search) !== -1 ||
//         x.maincategory.toLowerCase() === search ||
//         x.subcategory.toLowerCase() === search ||
//         x.brand.toLowerCase() === search ||
//         x.color.toLowerCase() === search ||
//         x.size.toLowerCase() === search ||
//         x.description.toLowerCase().search(search) !== -1
//     );
//     setProduct(p);
//   }
//   useEffect(() => {
//     getAPIData();
//   }, [
//     query,
//     allMaincategories.length,
//     allSubcategories.length,
//     allBrands.length,
//     allProducts.length,
//   ]);

//   const AllCategory = () => (
//     <div className="list-group" style={{ height: "24rem", overflow: "auto" }}>
//       <button
//         className="list-group-item list-group-item-action"
//         onClick={() => filterData("All", sc, br)}
//       >
//         All
//       </button>
//       {allMaincategories.map((item, index) => {
//         return (
//           <button
//             key={index}
//             onClick={() => filterData(item.name, sc, br)}
//             className="list-group-item list-group-item-action"
//           >
//             {item.name}
//           </button>
//         );
//       })}
//     </div>
//   );

//   const AllSubCategory = () => (
//     <div className="list-group" style={{ height: "24rem", overflow: "auto" }}>
//       <button
//         className="list-group-item list-group-item-action"
//         onClick={() => filterData(mc, "All", br)}
//       >
//         All
//       </button>
//       {allSubcategories.map((item, index) => {
//         return (
//           <button
//             key={index}
//             onClick={() => filterData(mc, item.name, br)}
//             className="list-group-item list-group-item-action"
//           >
//             {item.name}
//           </button>
//         );
//       })}
//     </div>
//   );

//   const AllBrand = () => (
//     <div className="list-group" style={{ height: "24rem", overflow: "auto" }}>
//       <button
//         className="list-group-item list-group-item-action"
//         onClick={() => filterData(mc, sc, "All")}
//       >
//         All
//       </button>
//       {allBrands.map((item, index) => {
//         return (
//           <button
//             key={index}
//             onClick={() => filterData(mc, sc, item.name)}
//             className="list-group-item list-group-item-action"
//           >
//             {item.name}
//           </button>
//         );
//       })}
//     </div>
//   );
//   const handleButtonClick = (button) => {
//     setActiveButton(button);
//   };
//   function getSortFilter(e) {
//     let { value } = e.target;
//     if (value === "1") setProduct(product.sort((x, y) => y._id - x._id));
//     else if (value === "2")
//       setProduct(product.sort((x, y) => y.finalprice - x.finalprice));
//     else setProduct(product.sort((x, y) => x.finalprice - y.finalprice));
//     flag ? setFlag(false) : setFlag(true);
//   }
//   return (
//     <>
//       <div className="container-fluid my-3">
//         <div className="row">
//           <div className="col-md-3">
//             <button
//               onClick={() => handleButtonClick("allCategory")}
//               className="list-group-item list-group-item-action active "
//             >
//               All Categories
//             </button>
//             {activeButton === "allCategory" ? <AllCategory /> : ""}
//             <button
//               onClick={() => handleButtonClick("allSubCategory")}
//               className="list-group-item list-group-item-action active mt-3 "
//             >
//               SubCategories
//             </button>
//             {activeButton === "allSubCategory" ? <AllSubCategory /> : ""}
//             <button
//               onClick={() => handleButtonClick("allBrand")}
//               className="list-group-item list-group-item-action active mt-2 "
//             >
//               Brand
//             </button>
//             {activeButton === "allBrand" ? <AllBrand /> : ""}
//             <h6 className="header-color my-2 text-light p-2">Price Filter</h6>
//             <div className="row">
//               <div className="col-md-6">
//                 <label>Min</label>
//                 <input
//                   type="number"
//                   name="min"
//                   onChange={getPriceFilter}
//                   placeholder="Min Amount"
//                   className="form-control"
//                   value={min}
//                 />
//               </div>
//               <div className="col-md-6">
//                 <label>Max</label>
//                 <input
//                   type="number"
//                   name="max"
//                   onChange={getPriceFilter}
//                   placeholder="Max Amount"
//                   className="form-control"
//                   value={max}
//                 />
//               </div>
//               <div className="my-3">
//                 <button
//                   className="btn main-color w-100"
//                   onClick={applyPriceFilter}
//                 >
//                   Apply
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-9">
//             <div className="row">
//               <div className="col-md-9">
//                 <form
//                 // onSubmit={postSearch}
//                 >
//                   <div className="mb-3 btn-group w-100">
//                     <input
//                       type="search"
//                       name="search"
//                       // onChange={(e) => setSearch(e.target.value.toLowerCase())}
//                       placeholder="Enter Product Name,Brand,Category,Size,Color to Search"
//                       className="form-control"
//                     />
//                     <button type="submit" className="btn main-color">
//                       Search
//                     </button>
//                   </div>
//                 </form>
//               </div>
//               <div className="col-md-3 mb-3">
//                 <select
//                   name="sortFilter"
//                   onChange={getSortFilter}
//                   className="form-control"
//                 >
//                   <option  value="1">Latest</option>
//                   <option value="2">Price: High to Low</option>
//                   <option value="3">Price: Low to High</option>
//                 </select>
//               </div>
//             </div>
//             <div className="row">
//               {product.map((item, index) => {
//                 return (
//                   <div key={index} className="col-lg-3 col-md-4 col-sm-6 pb-1">
//                     <div className="product-item bg-light mb-2">
//                       <div className="product-img position-relative overflow-hidden">
//                         <Link to={`/single-product/${item._id}`}>
//                           <img
//                             className="img-fluid w-100"
//                             src={`/public/products/${item.pic1}`}
//                             style={{ height: "200px", width: "100%" }}
//                             alt=""
//                           />
//                         </Link>
//                       </div>
//                       <div className="text-center py-4">
//                         <Link
//                           className="h6 text-decoration-none text-truncate"
//                           to={`/single-product/${item._id}`}
//                         >
//                           {item.name.length > 28
//                             ? `${item.name.slice(0, 28)}..`
//                             : `${item.name}`}
//                         </Link>
//                         <div className="d-flex align-items-center justify-content-center mt-2">
//                           <h5>&#8377;{item.finalprice}</h5>
//                           <h6 className="text-muted ml-2">
//                             <del className="text-danger">
//                               &#8377;{item.baseprice}
//                             </del>{" "}
//                             <sup className="text-success">
//                               {item.discount}% OFF
//                             </sup>
//                           </h6>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
