import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';




export default function Navbar() {
    var [search, setSearch] = useState("");
    let navigate = useNavigate()
let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)

    function logout() {
        localStorage.clear()
        navigate("/login")
    }
    function postSearch(e) {
        e.preventDefault();
        navigate({
            pathname: "/shop",
            search: "?search=" + search,
        });
    }
    const handleChange = (_id) => {
        navigate(`/shop`);
      };
    
    return (
        <>

            {/* <!-- Topbar Start --> */}
            <div className="container-fluid bg-light p-0">
                <div className="row gx-0 d-none d-lg-flex">
                    <div className="col-lg-4 px-5 text-start">
                        <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                            <small className="fa fa-map-marker-alt text-dark me-2"></small>
                            <small className='text-dark'>Delhi, India</small>
                        </div>
                    </div>
                    <div className="col-lg-8 px-5 text-end">
                        <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                            <small className="fa fa-phone-alt text-dark me-2"></small>
                            <small><Link to="tel:7979973557" className='text-dark'>+91-7979973557 </Link></small>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                            <small className="fa fa-envelope text-dark me-2"></small>
                            <small ><Link to="mailto:rafiehayat5@gmail.com" className='text-dark'>rafiehayat5@gmail.com </Link></small>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center">
                            <Link className="btn btn-sm-square btn-color text-light me-1" to=""><i className="fab fa-facebook-f"></i></Link>
                            <Link className="btn btn-sm-square btn-color text-light me-1" to=""><i className="fab fa-twitter"></i></Link>
                            <Link className="btn btn-sm-square btn-color text-light me-1" to=""><i className="fab fa-linkedin-in"></i></Link>
                            <Link className="btn btn-sm-square btn-color text-light me-0" to=""><i className="fab fa-instagram"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Topbar End --> */}


            {/* <!-- Navbar Start --> */}
            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                <Link to="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                    <h2 className="m-0 text-color"><i className="fa fa-shopping-cart me-3"></i>Shoppable</h2>
                </Link>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto p-4 p-lg-0">
                        {/* <div className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                Menu
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link to="/about" className="dropdown-item">About</Link></li>
                                <li><Link to="/shop" className="dropdown-item">Shop</Link></li>
                                <li><Link to="/contact" className="dropdown-item">Contact</Link></li>
                            </ul>
                        </div> */}
                        <div className="nav-item dropdown">
    <button className="nav-link dropdown-toggle" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" style={{height: "30px", border:"none", backgroundColor:"transparent"}}>
        Main-Categories
    </button>
    {/* <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><Link to="/about" className="dropdown-item">About</Link></li>
        <li><Link to="/shop" className="dropdown-item">Shop</Link></li>
        <li><Link to="/contact" className="dropdown-item">Contact</Link></li>
    </ul> */}
    <div className="dropdown-menu dropdown-menu-right ">
                    <button className="dropdown-item ">All</button>
                    {MaincategoryStateData.map((item, index) => (
                      <button
                        key={index}
                        className="dropdown-item"
                        onClick={() => handleChange(item._id)}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
</div>

                        <Link to="/about" className="nav-item nav-link">About</Link>
                        <Link to="/shop" className="nav-item nav-link">Shop</Link>
                        <Link to="/contact" className="nav-item nav-link">Contact</Link>
                    </div>
                    <div className="d-flex align-items-center flex-grow-1">
                        <form onSubmit={postSearch} className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                placeholder="Search"
                                aria-label="Search"
                                style={{ maxWidth: '200px' }}
                            />
                            <button className="btn btn-color text-light" type="submit">Search</button>
                        </form>
                    </div>


                    <div className="navbar-nav">
                        <Link to="/cart" className="nav-item nav-link"><i className="fa fa-shopping-cart fa-lg"></i></Link>
                        <Link to="/wishlist" className="nav-item nav-link"><i className="fa fa-heart fa-lg"></i></Link>
                    </div>
                    {localStorage.getItem("login") ?
                        <div className="nav-item dropdown  btn-color">
                            <a to="#" className="nav-link dropdown-toggle text-light" data-bs-toggle="dropdown">{localStorage.getItem("name")}</a>
                            <div className="dropdown-menu fade-up m-0">
                                {localStorage.getItem("role") === "Admin" ?
                                    <Link to="/admin" className="dropdown-item">Profile</Link> :
                                    <Link to="/profile" className="dropdown-item">Profile</Link>
                                }
                                {localStorage.getItem("role") === "Buyer" ?
                                    <>
                                        <Link to="/checkout" className="dropdown-item">Checkout</Link>
                                        <Link to="/order" className="dropdown-item">My Orders</Link>
                                    </> : ""
                                }
                                <button className="dropdown-item" onClick={logout}>Logout</button>
                            </div>
                        </div>
                        :
                        <Link to="/login" className="btn btn-color text-light p-3 pt-4">Login</Link>
                    }
                </div>
            </nav>

            {/* <!-- Navbar End --> */}


        </>
    )
}
