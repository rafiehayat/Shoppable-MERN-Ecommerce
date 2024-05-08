import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import {addContactUs} from "../Store/ActionCreators/ContactUsActionCreators"
export default function Contact() {
    let [data,setData] = useState({
        name:"",
        email:"",
        phone:"",
        subject:"",
        message:""
    })
    let [show,setShow] = useState(false)
    let dispatch = useDispatch()
    function getInputData(e){
        var {name,value} =e.target
        setData((old) =>{
            return{
                ...old,
                [name]:value
            }
        })
    }
    function postData(e){
          e.preventDefault()  
          dispatch(addContactUs({...data,date:new Date, status:"Active"}))
          setShow(true)
          setData({
              name:"",
              email:"",
              phone:"",
              subject:"",
              message:""
    })
   }
  return (
    <>  
    {/* <!-- Contact Start --> */}
    <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="text-color text-uppercase">// Contact Us //</h6>
                <h1 className="mb-5 text-dark">Contact For Any Query</h1>
            </div>
            <div className="row g-4">
                <div className="col-12">
                    <div className="row gy-4">
                        <div className="col-md-4">
                            <div className="bg-light d-flex flex-column justify-content-center p-4">
                                <h5 className="text-uppercase"> Address :- </h5>
                                <p className="m-0"><i className="fa fa-home text-color me-2"></i>Delhi, India</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="bg-light d-flex flex-column justify-content-center p-4">
                                <h5 className="text-uppercase"> Email :-</h5>
                                <p className="m-0"><i className="fa fa-envelope text-color me-2"></i><a href="mailto:rafiehayat5@gmail.com" className='text-dark'>rafiehayat5@gmail.com</a></p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="bg-light d-flex flex-column justify-content-center p-4">
                                <h5 className="text-uppercase"> Phone :-</h5>
                                <p className="m-0"><i className="fa fa-phone text-color me-2"></i><a href="tel:+91 7979973557" className='text-dark'>+91-7979973557</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
                <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height="500px" id="gmap_canvas" src="https://maps.google.com/maps?q=noida%20secter%2016%20delhi%20india&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div></div>
                </div>
                <div className="col-md-6">
                    <div className="wow fadeInUp" data-wow-delay="0.2s">
                    {
                        show?
                        <p>Thanks to Contact Us. Our Team Will Contact You Soon </p>:""
                    }
                        <form onSubmit={postData}>
                            <div className="row g-3">
                                <div className="col-12">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" name='name' value={data.name} onChange={getInputData} id="name" placeholder=" Name"/>
                                        <label htmlFor="name"> Name</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <input type="email" className="form-control" name='email' value={data.email} onChange={getInputData} id="email" placeholder=" Email"/>
                                        <label htmlFor="email"> Email</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <input type="phone" className="form-control" name='phone' value={data.phone} onChange={getInputData} id="phone" placeholder=" Phone Number"/>
                                        <label htmlFor="phone"> Phone number</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" name='subject' value={data.subject} onChange={getInputData} id="subject" placeholder="Subject"/>
                                        <label htmlFor="subject">Subject</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Leave a message here" name='message' value={data.message} onChange={getInputData} id="message" style={{height: "135px"}}></textarea>
                                        <label htmlFor="message">Message</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-color text-light w-100 py-3" type="submit">Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Contact End --> */}
    </>
  )
}
