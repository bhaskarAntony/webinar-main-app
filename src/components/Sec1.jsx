import React from 'react'
import ContactForm from './ContactForm';
import content from '../data/content.json'
import Contact from './Contact';



  
  function Sec1() {
      

  return (
    <section id='headline' className="d-flex align-items-center justify-content-center">
        <div className="container">
          < div className="row">
        <div className="col-12 col-md-12 col-lg-8">
       <div className="hero-text">
       <span className="fs-4 rounded-5 bg-white p-1 px-3 text-black" data-animation="fadeInLeft" data-delay=".1s"> 
                      { content.hero.subTitle} <i class="bi bi-arrow-right"></i> </span>
                  <h1 className="display-1 text-light fw-bold" data-animation="fadeInLeft" data-delay=".5s"> 
                    { content.hero['mainTitle-1'] } <span className="text-black"> { content.hero['mainTitle-2']} </span>
                   </h1>
       </div>
        </div>
        <div className="col-12 col-md-12 col-lg-4">
            <ContactForm/>
        </div>

                  
          </div>
        </div>
    </section>
  )
}

export default Sec1
