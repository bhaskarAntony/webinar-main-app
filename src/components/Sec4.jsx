import React from 'react'
import content from "../data/content.json"

function Sec4() {
  return (
    <section id='schedule'>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-md-12">
                <h3 className="display-6 text-center text-main-1">
                    Event Highlights
                </h3>
            </div>
          </div>

          <div className="row mt-3 mb-3">
            {
                  content && content.highlights.map((item,index) => {
                      return (
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2 mb-2" key={index}>
                          <div className="card">
                              <img src={item.image} alt="" className="card-img-top img-fluid" />
                              <div className="card-body p-5 text-center">
                                  <h4 className="text-main"> { item.title } </h4>
                                  <p className="card-content text-secondary text-justify">
                                      { item.desc }
                                  </p>
                              </div>
                          </div>
                      </div>
                      )
                  })
            }
          </div>
        </div>
    </section>
  )
}

export default Sec4
