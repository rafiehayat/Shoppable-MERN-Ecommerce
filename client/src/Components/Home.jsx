import React, { useEffect, useState } from 'react'
import Testimonials from './Testimonials'
import { useDispatch, useSelector } from 'react-redux'

import { getProduct } from "../Store/ActionCreators/ProductActionCreators"
import { Link } from 'react-router-dom'
import Trending from './Trending'
import ClientSidebar from './ClientSidebar'
import { apiLink } from '../utils/utils'
export default function Home() {
    let [data, setData] = useState([])
    var [products, setProducts] = useState([]);
    let dispatch = useDispatch()
    let ProductStateData = useSelector((state) => state.ProductStateData)

    const sortedProducts = products.sort((a, b) => b.discount - a.discount);
    function getAPIData() {
        dispatch(getProduct())
        if (ProductStateData.length) {
            setData(ProductStateData.slice(0, 12))
        }
    }
    const getTrendingProducts = () => {
        return ProductStateData
            .filter((product) => product.discount > 0)
            .sort((a, b) => b.discount - a.discount)
            .slice(0, 12);
    };
    const trendingProducts = getTrendingProducts();
    useEffect(() => {
        getAPIData()
        if (ProductStateData.length) {
            setProducts(ProductStateData.slice(0, 12));
        }
    }, [ProductStateData.length])
    return (
        <>
            {/* <!-- Carousel Start --> */}
            <div className="container-fluid p-0 mb-3 mt-4">
                <div className="row">
                    <div className="col-lg-3">
                        <ClientSidebar />
                    </div>
                    <div className="col-lg-9">
                        <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img className="w-100" src="img/carousel-bg-1.jpg" height="400px" width="100%" alt="Image" />
                                    <div className="carousel-caption d-flex align-items-center">
                                        <div className="container">
                                            <div className="row align-items-center justify-content-center justify-content-lg-start">
                                                <div className="col-10 col-lg-7 text-center text-lg-start">
                                                </div>

                                                <div className="col-lg-5 d-none d-lg-flex animated zoomIn">
                                                    <img className="img-fluid" src="img/carousel-1.png" style={{ height: "320px", width: "90%" }} alt="" />
                                                </div>
                                                <Link to="/shop" className="btn btn-color text-light btn-sm py-2 px-3 animated slideInDown" style={{ fontSize: '0.875rem', width: '10%' }}>
                                                    Shop Now
                                                    <i className="fa fa-arrow-right ms-2"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img className="w-100" src="img/carousel-bg-2.jpg" height="400px" width="100%" alt="Image" />
                                    <div className="carousel-caption d-flex align-items-center">
                                        <div className="container">
                                            <div className="row align-items-center justify-content-center justify-content-lg-start">
                                                <div className="col-10 col-lg-7 text-center text-lg-start">

                                                </div>
                                                <div className="col-lg-5 d-none d-lg-flex animated zoomIn">
                                                    <img className="img-fluid" src="img/carousel-2.png" style={{ height: "320px", width: "100%" }} alt="" />
                                                </div>
                                                <Link to="/shop" className="btn btn-color text-light btn-sm py-2 px-3 animated slideInDown" style={{ fontSize: '0.875rem', width: '10%' }}>
                                                    Shop Now
                                                    <i className="fa fa-arrow-right ms-2"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Carousel End -->*/}
            <Trending />

            {/* <!-- Fact Start --> */}
            <div className="container-fluid fact bg-dark my-2 py-2">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-4 text-center wow fadeIn" data-wow-delay="0.1s">
                            <i className="fa fa-check fa-2x text-white mb-3"></i>
                            <h2 className="text-white mb-2" data-toggle="counter-up">50k+</h2>
                            <p className="text-white mb-0">Happy Customers</p>
                        </div>
                        <div className="col-md-6 col-lg-3 text-center wow fadeIn" data-wow-delay="0.3s">
                            <i className="fa fa-users-cog fa-2x text-white mb-3"></i>
                            <h2 className="text-white mb-2" data-toggle="counter-up">20k+</h2>
                            <p className="text-white mb-0">Products</p>
                        </div>
                        <div className="col-md-6 col-lg-3 text-center wow fadeIn" data-wow-delay="0.5s">
                            <i className="fa fa-users fa-2x text-white mb-3"></i>
                            <h2 className="text-white mb-2" data-toggle="counter-up">5k+</h2>
                            <p className="text-white mb-0">Brands</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Fact End --> */}

            {/* <!-- Discounted Product Start --> */}
            {/* <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h1 className="mb-5">Discounted Products</h1>
                    </div>
                    <div className="row g-4">
                        {
                            sortedProducts.map((item, index) => {
                                return <div key={index} className="col-lg-2 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="team-item">
                                        <div className="position-relative overflow-hidden">
                                            <img className="img-fluid" src={`/${item.pic1}`} style={{ height: "150px", width: "100%" }} alt="" />
                                            <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                                                <img src={`/${item.pic2}`} className='position-absolute start-0 top-0 w-100 h-100' style={{ height: "150px", width: "100%" }}></img>
                                                <Link className="btn btn-square w-100 position-absolute start-0 bottom-0 w-100 h-100'" to={`/product/${item._id}`}><i className="fa fa-shopping-cart"></i>Add to Cart</Link>

                                            </div>
                                        </div>
                                        <div className="bg-light text-center">
                                            <h5 className="fw-bold mb-0" style={{ height: "50px" }}>{item.name}</h5>
                                            <small><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></small>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div> */}
            {/* <!-- Discounted Product End --> */}


            {/* <!-- Discounted Product Start --> */}
            <div className="container-xxl py-2">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h1 className="mb-5">Discounted Products</h1>
                    </div>
                    <div className="row g-4">
                        {
                            sortedProducts.map((item, index) => {
                                return <div key={index} className="col-lg-2 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="team-item">
                                        <div className="position-relative overflow-hidden">
                                            <Link to={`/product/${item._id}`}>
                                                <img className="img-fluid" src={`${apiLink}/${item.pic1}`} style={{ height: "150px", width: "100%" }} alt="" />
                                                <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                                                    <img src={`${apiLink}/${item.pic2}`} className='position-absolute start-0 top-0 w-100 h-100' style={{ height: "150px", width: "100%" }}></img>
                                                    {/* <Link className="btn btn-square w-100 position-absolute start-0 bottom-0 w-100 h-100'" to={`/product/${item._id}`}><i className="fa fa-shopping-cart"></i>Add to Cart</Link> */}

                                                </div>
                                            </Link>
                                        </div>
                                        <div className="bg-light text-center">
                                            <h5 className="fw-bold mb-0" style={{ height: "50px" }}>{item.name}</h5>
                                            <small><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></small>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            {/* <!-- Discounted Product End --> */}
            <div className="col-lg-12 mt-4">
                <img
                    src="/img/newArrival.png"
                    alt="Image"
                    className="img-fluid"
                />
            </div>

            {/* <!-- Product Start --> */}
            <div className="container-xxl py-2">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h1 className="mb-5">Latest Products</h1>
                    </div>
                    <div className="row g-4">
                        {
                            data.map((item, index) => {
                                return <div key={index} className="col-lg-2 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="team-item">
                                        <div className="position-relative overflow-hidden">
                                            <img className="img-fluid" src={`${apiLink}/${item.pic1}`} style={{ height: "150px", width: "100%" }} alt="" />
                                            <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                                                <img src={`${apiLink}/${item.pic2}`} className='position-absolute start-0 top-0 w-100 h-100' style={{ height: "150px", width: "100%" }}></img>
                                                <Link className="btn btn-square w-100 position-absolute start-0 bottom-0 w-100 h-100'" to={`/product/${item._id}`}><i className="fa fa-shopping-cart"></i>Add to Cart</Link>

                                            </div>
                                        </div>
                                        <div className="bg-light text-center p-3">
                                            <h5 className="fw-bold mb-0" style={{ height: "50px" }}>{item.name}</h5>
                                            <small><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></small>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>

            {/* <!-- Product End --> */}

            {/* <!-- Trending Product Start --> */}
            <div className="container-xxl py-2">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h1 className="mb-5">Trending Products</h1>
                    </div>
                    <div className="row g-4">
                        {
                            trendingProducts.map((item, index) => {
                                return <div key={index} className="col-lg-2 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="team-item">
                                        <div className="position-relative overflow-hidden">
                                            <img className="img-fluid" src={`${apiLink}/${item.pic1}`} style={{ height: "150px", width: "100%" }} alt="" />
                                            <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                                                <img src={`${apiLink}/${item.pic2}`} className='position-absolute start-0 top-0 w-100 h-100' style={{ height: "150px", width: "100%" }}></img>
                                                <Link className="btn btn-square w-100 position-absolute start-0 bottom-0 w-100 h-100'" to={`/product/${item._id}`}><i className="fa fa-shopping-cart"></i>Add to Cart</Link>

                                            </div>
                                        </div>
                                        <div className="bg-light text-center p-3">
                                            <h5 className="fw-bold mb-0" style={{ height: "50px" }}>{item.name}</h5>
                                            <small><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></small>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            {/* <!--Trending Product End --> */}


            {/* <!-- Service Start --> */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="d-flex py-5 px-4">
                                <i className="fa fa-certificate fa-3x text-color flex-shrink-0"></i>
                                <div className="ps-4">
                                    <h5 className="mb-3">Fast Delivery</h5>
                                    <p>Diam dolor diam ipsum sit amet diam et eos erat ipsum</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="d-flex bg-light py-5 px-4">
                                <i className="fa fa-users-cog fa-3x text-color flex-shrink-0"></i>
                                <div className="ps-4">
                                    <h5 className="mb-3">100% Refund Policy</h5>
                                    <p>Diam dolor diam ipsum sit amet diam et eos erat ipsum</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="d-flex py-5 px-4">
                                <i className="fa fa-tools fa-3x text-color flex-shrink-0"></i>
                                <div className="ps-4">
                                    <h5 className="mb-3">100% Original Products</h5>
                                    <p>Diam dolor diam ipsum sit amet diam et eos erat ipsum</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Service End --> */}

            <Testimonials />
        </>
    )
}
