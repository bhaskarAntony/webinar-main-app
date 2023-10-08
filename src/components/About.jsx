import React, { useEffect } from 'react'
import content from '../data/content.json'

function About() {
        const counter  = () => {
          // Set the date we're counting down to
      let countDownDate = new Date("Oct 14, 2023 12:00:00").getTime();

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

      document.querySelector(".day").innerHTML = days;
      document.querySelector(".hour").innerHTML = hours;
      document.querySelector(".minute").innerHTML = minutes;
      document.querySelector(".second").innerHTML = seconds;

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
    <section id='about' className="d-flex align-items-center justify-content-center">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 align-item-center">
                    <h1 className="display-4 text-main-1"> About webinar </h1>
                    <h5 className="text-secondary">
                    {content.about.title}
                    </h5>

                  <div className="row mt-2 mb-2">
                    <div className="col-lg-6 col-md-12 col-sm-12 mt-2 mb-2">
                        <div className="card">
                          <div className="card-body">
                             <h4> <i className="bi bi-geo-alt text-main-1"></i> Where</h4>
                             <h6 className="text-main-1"> { content.about.where } </h6>
                          </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 mt-2 mb-2">
                        <div className="card">
                          <div className="card-body">
                              <h4> <i className="bi bi-calendar-check text-main-1"></i> When</h4>
                              <h6 className="text-main-1"> { content.about.when } </h6>
                          </div>
                        </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 text-center d-flex align-items-center justify-content-center p-3">
                      <div className="offer mt-4 mb-2">
                                    <h5 className="text-main display-6">
                                      Event Date
                                    </h5>
                                    <div id="demo" className="d-flex">
                                        <div className="circle">
                                            <strong className="day"></strong>
                                            <sup>Days</sup>
                                        </div>
                                        <div className="circle">
                                            <strong className="hour"></strong>
                                            <sup>hrs</sup>
                                        </div>
                                        <div className="circle">
                                            <strong className="minute"></strong>
                                            <sup>mins</sup>
                                        </div>
                                        <div className="circle">
                                            <strong className="second"></strong>
                                            <sup>secs</sup>
                                        </div>
                                    </div>

                            </div>
                      </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 d-sm-none d-md-block d-lg-block" id='abt-img'>
                    <img src={content.about.abt1} alt="no image" className='img-fluid img-repsonsive abt1' />
                    <img src={content.about.abt2} alt="no image" className='img-fluid img-repsonsive abt2' />
                </div>
            </div>
        </div>
    </section>
  )
}

export default About
