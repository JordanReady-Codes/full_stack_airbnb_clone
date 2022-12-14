import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import './bookings.scss';
import Layout from '@src/layout';
import ResumeCheckout from '@src/bookings/resumeCheckout';


class MyBookings extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        bookings: [],
        property: [],
      }

    }

  componentDidMount() { 
    fetch('/api/authenticated')
    fetch(`/api/userBookings/`, safeCredentials())
          .then(handleErrors)
          .then(data => {
            console.log(data.bookings);
            this.setState({
              bookings: data.bookings
            })
          })
  }

  
  render () {
    const { bookings } = this.state;
    return (
        <Layout>
          <div className="container px-4">
          <h1 className="mb-1 header">My Bookings</h1>
          <div className="row mt-3 gx-5">
            {bookings.map(function(booking, index) {
              if (booking.is_paid) {
                return (
                  <div key={index} className="col-6 col-lg-4 mb-4">
                    <div className="booking-card">
                      <p className='booking-paid'>This booking is fully paid!</p>
                      <div className="property-image mt-1 mx-1 rounded" style={{ backgroundImage: `url(${booking.property.image_url})` }} />
                      <p className="mb-0 booking-title">
                      {booking.property.title}</p>
                      <p className=" mb-0 booking-info"><b>Start Date: {booking.start_date}</b></p>
                      <p className=" mb-0 booking-info"><b>End Date: {booking.end_date}</b></p>
                      <ResumeCheckout checkout_session_id={booking.id} />
                      <a href={`http://localhost:3000/property/${booking.property_id}`} className="text-decoration-none">View Property Listing</a><br/>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div key={index} className="col-6 col-lg-4 mb-4">
                    <div className="booking-card">
                      <div className="property-image mt-1 mx-1 rounded" style={{ backgroundImage: `url(${booking.property.image_url})` }} />
                      <p className="mb-0 booking-title">
                      {booking.property.title}</p>
                      <p className=" mb-0 booking-info"><b>Start Date: {booking.start_date}</b></p>
                      <p className=" mb-0 booking-info"><b>End Date: {booking.end_date}</b></p>
                      <ResumeCheckout checkout_session_id={booking.id} />
                      <a href={`http://localhost:3000/property/${booking.property_id}`} className="text-decoration-none">View Property Listing</a><br/>
                    </div>
                  </div>
                )
              }
              
            })}
          </div>
        </div>
      </Layout>
    )
  }
}

export default MyBookings;