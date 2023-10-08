import React, { useState } from 'react'
import * as EmailValidator from 'node-email-validation'
import { toast } from 'react-toastify';
import content from '../data/content.json'
import axios from 'axios';
import Email from '../template/email';
import UserEmail from '../template/confirmation';
import InfluenceEmail from '../template/influence';

const URL = "https://email-api-r1kd.onrender.com"
  
  const Loader = () => {
    return (
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  };
  const LoadingModal = () => {
    return (
      <div className="loading-modal">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  };
function ContactForm() {
      const [reg, setReg] = useState({
      name: "",
      email: "",
      mobile: "",
      coupon: "",
    });
  
    const [err, setError] = useState(false);
    const [nameErr, setNameErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [mobileErr, setMobileErr] = useState("");
    const [loading, setLoading] = useState(false);
  
    const readValue = (e) => {
      const { name, value } = e.target;
      if (name === "name") {
        validateName(value);
      }
      if (name === "email") {
        validateEmail(value);
      }
      if (name === "mobile") {
        validateMobile(value);
      }
      setReg({ ...reg, [name]: value });
    };
  
    const validateName = (name) => {
      if (name === "") {
        setError(true);
        setNameErr("Name field cannot be empty");
      } else {
        let regex = /^[a-zA-Z\s]+$/;
        if (regex.test(name) === false) {
          setError(true);
          setNameErr("Please enter a valid name");
        } else {
          setError(false);
          setNameErr(false);
        }
      }
    };
  
    const validateMobile = (mobile) => {
      if (mobile === "") {
        setError(true);
        setMobileErr("Mobile field cannot be empty");
      } else {
        let regex = /^[6-9]\d{9}$/;
        if (regex.test(mobile) === false) {
          setError(true);
          setMobileErr("Invalid Mobile number");
        } else {
          setMobileErr("");
          setError(false);
        }
      }
    };
  
    const validateEmail = (email) => {
      if (email === "") {
        setError(true);
        setEmailErr("Email field cannot be empty");
      } else {
        let regex = /^\S+@\S+\.\S+$/;
        if (regex.test(email) === false) {
          setError(true);
          setEmailErr("Invalid Email format");
        } else if (EmailValidator.is_email_valid(email) === false) {
          setError(true);
          setEmailErr("Invalid Email service");
        } else {
          setError(false);
          setEmailErr("");
        }
      }
    };
  
    const sendEmail = async (name, email, mobile, coupon, influencer ) => {
      try {
        let data = Email(name, email, mobile, coupon, influencer);
        let to = "bhaskarbabucm6@gmail.com";
        let sub = "Webinar Registration details";
  
        let final = {
          to,
          subject: sub,
          content: data,
        };
  
        setLoading(true);
  
        await axios
          .post(`${URL}/api/send/mail`, final)
          .then((res) => {
            setLoading(false);
            toast.info("To Complete registration. Pay Rs.199 to secure your spot on the webinar.");
            window.location.href = content.pay.url;
          })
          .catch((err) => toast.error(err.message));
      } catch (err) {
        console.log(err.message);
      }
    };
  
    const checkCouponCode = (couponCode) => {
      const influencer = content.influencers.find((i) => i.couponCode === couponCode);
      return influencer ? influencer.email : null;
    };
  
    const submitHandler = async (e) => {
        e.preventDefault();
        // Perform final validation here
        try {
            axios.post('https://teal-fluffy-hen.cyclic.app/api/users/register', reg)
            .then(response => {
              // Handle the response data here
              toast.success("user created successfully")
              console.log(response);
            })
            .catch(error => {
              // Handle any errors here
              toast.error(error)
              console.error(error);
            });
        } catch (error) {
          // Handle any network errors or server-side errors here
          console.error('Error:', error);
          toast.error('An error occurred while creating the influencer. Please try again.');
        }
    
        if (err) {
            toast.error("Check your Details..");
        } else {
            // Check if the entered coupon code matches an influencer's coupon code
            const influencer = content.influencers.find((i) => i.couponCode === reg.coupon);
            console.log("Coupon Code:", reg.coupon);
            console.log("Influencer Object:", influencer);

            if (influencer) {
                sendEmail(reg.name, reg.email, reg.mobile, reg.coupon, influencer.email);
            } else {
                sendEmail(reg.name, reg.email, reg.mobile, reg.coupon, null);
            }
    
            // Send an email to the user
            try {
                let userData = UserEmail(reg.name);
                let userTo = reg.email; // User's email address
                let userSub = "Webinar Registration Confirmation";
    
                let userMail = {
                    to: userTo,
                    subject: userSub,
                    content: userData,
                };
    
                setLoading(true);
    
                await axios
                    .post(`${URL}/api/send/mail`, userMail)
                    .then((res) => {
                        setLoading(false);
                    })
                    .catch((err) => {
                        setLoading(false);
                        console.error("Error sending user email:", err.message);
                    });
            } catch (err) {
                console.error("Error sending user email:", err.message);
            }
    
            if (influencer) {
                // If a match is found, send an email to the influencer's email address
                try {
                    let influencerData = InfluenceEmail(reg.name, reg.email, reg.mobile, reg.coupon, influencer.email);
                    let influencerTo = influencer.email; // Influencer's email address
                    let influencerSub = "User Registered with Your Coupon Code";
    
                    let influencerMail = {
                        to: influencerTo,
                        subject: influencerSub,
                        content: influencerData,
                    };
    
                    setLoading(true);
    
                    await axios
                        .post(`${URL}/api/send/mail`, influencerMail)
                        .then((res) => {
                            setLoading(false);
                            // You can add a toast or message here for the influencer
                        })
                        .catch((err) => {
                            setLoading(false);
                            console.error("Error sending influencer email:", err.message);
                            toast.error("Failed to send influencer email. Please try again.");
                        });
                } catch (err) {
                    console.error("Error sending influencer email:", err.message);
                }
            }
        }
    };
  return (
    <div className='d-flex justify-content-center'> 
    {
        loading ? (<div className="card-body">
                 <LoadingModal/>
        </div>) : (
<div className="card contact-card">
<div className="card-header bg-dark p-3 text-center">
  <div className="text-start">
  <img src={content.header.logo} alt="" className='img-fluid mt-1 mb-1 text-start' width={120} height={100} />
  </div>
    <h4 className="text-light"> { content.hero['mainTitle-1']} <span className="text-main"> { content.hero['mainTitle-2']} </span> </h4>
    <h4>
        <s className="text-danger"> &#8377;{ content.action.amount } </s> &nbsp;
         <span className='text-light'> &#8377; { content.action.discount } /- </span>
    </h4>
</div>

            <div className="card-body bg-light">
    <h4 className="text-black text-center text-uppercase mb-2">
        Register for webinar
    </h4>
    <form autoComplete="off" method='post' onSubmit={submitHandler}>
        <div className="form-group mt-4">
            
            <input type="text" name="name" value={reg.name} onChange={readValue} id="name" className="form-control" placeholder='Enter name' required />
            <div>
                    { err && nameErr ? <strong className="text-danger"> { nameErr } </strong> : null }
            </div>
        </div>
        <div className="form-group mt-2">

            <input type="text" name="email" value={reg.email} onChange={readValue} id="email" className="form-control" placeholder='Enter Email' required />
            <div>
                    { err && emailErr ? <strong className="text-danger"> { emailErr } </strong> : null }
            </div>
        </div>
        <div className="form-group mt-2">

            <input type="text" name="mobile" value={reg.mobile} onChange={readValue} id="mobile" className="form-control" placeholder='Enter Mobile' required />
            <div>
                    { err && mobileErr ? <strong className="text-danger"> { mobileErr } </strong> : null }
            </div>
        </div>
        <div className="form-group mt-2">
        <input type="text" name="coupon" value={reg.coupon} onChange={readValue} id="coupon" className="form-control" placeholder='Enter Coupon Code (optional)' required />
        </div>
        
        <div className="form-group mt-2 d-grid gap-2">
            <input type="submit" value="Confirm" className="confirm-btn" />
        </div>
    </form>
</div>
</div>
        )
}
</div>
  )
}

export default ContactForm
