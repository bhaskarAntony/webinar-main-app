import React, { useState } from 'react'
import * as EmailValidator from 'node-email-validation'
import { toast } from 'react-toastify';
import content from '../data/content.json'
import axios from 'axios';
import Email from '../template/email';
import ContactForm from './ContactForm';

const URL = "https://email-api-r1kd.onrender.com"

const Loader = () => {
    return (
        <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}



function Contact() {
    const [reg,setReg] = useState({
        name: "",
        email: "",
        mobile: "",
        coupon:""
    })

    const [err,setError] = useState(false)

    const [nameErr,setNameErr] = useState("")
    const [emailErr,setEmailErr] = useState("")
    const [mobileErr,setMobileErr] = useState("")

    const [loading,setLoading] = useState(false)

    const readValue = (e) => {
        const { name, value } = e.target;
        if(name === "name") {
            validateName(value)
        } 
        if(name === "email") {
            validateEmail(value)
        }

        if(name === "mobile") {
            validateMobile(value)
        }
        if(name === "coupon") {
            validateMobile(value)
        }
        setReg({...reg, [name]: value })
    }


    const validateName = (name) => {
        if(name === ""){
            setError(true)
            setNameErr("Name field cannot be empty");
        }else {
            let regex = /^[a-zA-Z\s]+$/;
            if(regex.test(name) === false) {
                setError(true)
               setNameErr("Please enter a valid name");
            } else{
                setError(false)
                setNameErr(false)
            }
        }
    }

    const validateMobile = (mobile) => {
        if(mobile === "") {
            setError(true)
            setMobileErr("Mobile field cannot be empty");
        } else {
            let regex = /^[6-9]\d{9}$/;
            if(regex.test(mobile) === false) {
                setError(true)
                setMobileErr("Invalid Mobile number");
            } else {
                setMobileErr("");
                setError(false)
            }
        }
    }

    const validateEmail = (email) => {
        if(email === "") {
            setError(true)
            setEmailErr("Email field cannot be empty");
        } else {
            let regex = /^\S+@\S+\.\S+$/;
            if(regex.test(email) === false) {
                setError(true)
                setEmailErr("Invalid Email format");
            } else if (EmailValidator.is_email_valid(email) === false) {
                setError(true)
                setEmailErr("Invalid Email service");
            } else {
                setError(false)
                setEmailErr("");
            }
        }
    }



    const submitHandler = async (e) => {
        e.preventDefault();
        try {
           
            if(err) {
                toast.error("Check your Details..")
            } else {
                let data = Email(reg.name,reg.email,reg.mobile, reg.coupon)
                let to = "chandini.cv@be-practical.com"
                let sub = "Webinar Registration details"

                let final = {
                    to,
                    subject: sub,
                    content: data
                }

                setLoading(true)

                await axios.post(`${URL}/api/send/mail`, final)
                        .then(res => {
                            // toast.success("Thank you for registration..")
                            setLoading(false)
                            toast.info("To Complete registration. Pay Rs.199 to secure your spot on webinar.")
                            window.location.href = content.pay.url
                        }).catch(err => toast.error(err.message))
            }

        } catch (err) {
            console.log(err.message)
        }
    }

  return (
    <section id='register'>
        <div className="container mt-5 mb-5">
            <div className="row  mt-5 mb-5">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-light">
                        Register with us
                    </h3>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                
              <ContactForm/>
            </div>
        </div>
    </section>
  )
}

export default Contact
