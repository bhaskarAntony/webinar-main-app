import React, { useEffect } from 'react'
import { Link  } from 'react-router-dom'
import content from '../data/content.json'

function Sec3() {
  const counter  = () => {
              // Set the date we're counting down to
        let countDownDate = new Date("Oct 12, 2023 12:00:00").getTime();

        // Update the count down every 1 second
        let x = setInterval(function() {

          // Get todays date and time
          let now = new Date().getTime();

          // Find the distance between now and the count down date
          let distance = countDownDate - now;

          // Time calculations for days, hours, minutes and seconds
          let days = Math.floor(distance / (1000 * 60 * 60 * 24));
          let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
          document.querySelector(".days").innerHTML = days;
          document.querySelector(".hours").innerHTML = hours;
          document.querySelector(".minutes").innerHTML = minutes;
          document.querySelector(".seconds").innerHTML = seconds;

          // If the count down is finished, write some text 
          if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
          }
        }, 1000);
  }

    useEffect(() => {
      counter()
    }, [])

  return (
    <section id='action' className='d-flex align-items-center'>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="display-6 text-center text-white d-grid gap-2 col-md-8 col-sm-12 mx-auto"  id='action-content'>
                      <Link to={content.pay.url} target='_blank' className="text-black btn bg-white">
                          <h3>
                          { content.action.txt } <s className="text-danger"> &#8377;{ content.action.amount } </s> &nbsp; <span className='text-main'> &#8377; { content.action.discount } </span>
                          </h3>
                      </Link>
                </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 d-flex align-items-center justify-content-center">
            <div className="offer mt-4 mb-2">
                          <h5 className="text-light display-6">
                            Offer ends in
                          </h5>
                          <div id="demo" className="d-flex">
                              <div className="circle">
                                  <strong className="days"></strong>
                                  <sup>Days</sup>
                              </div>
                              <div className="circle">
                                  <strong className="hours"></strong>
                                  <sup>hrs</sup>
                              </div>
                              <div className="circle">
                                  <strong className="minutes"></strong>
                                  <sup>mins</sup>
                              </div>
                              <div className="circle">
                                  <strong className="seconds"></strong>
                                  <sup>secs</sup>
                              </div>
                          </div>

                  </div>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Sec3
