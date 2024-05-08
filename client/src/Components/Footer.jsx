import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { apiLink } from '../utils/utils'

export default function Footer() {
    let [email,setEmail] = useState("")
    let [show,setShow] = useState(false)
    let [message,setMessage] = useState("")
    async function postData(){
           let  response = await fetch(`${apiLink}/api/newsletter`,{
                    method:"post",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify({email:email})
                })
                response = await response.json()
                setShow(true)
                setMessage(response.message)
                setEmail("")
            }
  return (
    <>
      {/* <!-- Footer Start --> */}
    <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-4 col-md-6">
                    <h4 className="text-light mb-4">Address</h4>
                    <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Delhi , India</p>
                    <p className="mb-2"><i className="fa fa-phone-alt me-3"></i><Link className='text-light' to="tel:7979973557">+91-7979973557 </Link></p>
                    <p className="mb-2"><i className="fa fa-envelope me-3"></i><Link className='text-light' to="mailto:rafiehayat5@gmail.com">rafiehayat5@gmail.com</Link> </p>
                    <div className="d-flex pt-2">
                        <Link className="btn btn-outline-light btn-social" to=""><i className="fab fa-twitter"></i></Link>
                        <Link className="btn btn-outline-light btn-social" to=""><i className="fab fa-facebook-f"></i></Link>
                        <Link className="btn btn-outline-light btn-social" to=""><i className="fab fa-youtube"></i></Link>
                        <Link className="btn btn-outline-light btn-social" to=""><i className="fab fa-linkedin-in"></i></Link>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-light mb-4">Quick Links</h4>
                    <Link className="btn btn-Link" to="/about">About Us</Link>
                    <Link className="btn btn-Link" to="/term">Terms & Condition</Link>
                    <Link className="btn btn-Link" to="/privacy">Privacy Policy</Link>
                    <Link className="btn btn-Link" to="/refund">Refund Policy</Link>
                    <Link className="btn btn-Link" to="/contact">Contact Us</Link>
                </div>
                <div className="col-lg-5 col-md-6">
                    <h4 className="text-light mb-4">Newsletter</h4>
                    <p>Subscribe our Newsletter service to get updates about our latest products and great deals</p>
                    {
                        show?
                        <p className='text-light'>{message}</p>:
                        ""
                    }
                    <div className="position-relative mx-auto" style= {{maxWidth: "400px"}}>
                        <input className="form-control border-0 w-100 py-3 ps-4 pe-5" onChange={(e) => setEmail(e.target.value)} type="email" name='email' placeholder="Your email" value={email}/>
                        <button type="button" className="btn btn-color text-light py-2 position-absolute top-0 end-0 mt-2 me-2" onClick={postData}>Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="copyright">
                <div className="row">
                    <div className="col-md-6 text-center text-md-end">
                        <div className="footer-menu">
                            <Link to="/">Home</Link>
                            <Link to="about">About</Link>
                            <Link to="/shop">Shop</Link>
                            <Link to="/contact">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Footer End --> */}
    </>
  )
}
