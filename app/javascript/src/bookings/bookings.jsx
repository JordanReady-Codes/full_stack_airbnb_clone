import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import './bookings.scss';
import Layout from '@src/layout';


class MyBookings extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        bookings: []
      }

    }

  componentDidMount() { 
    fetch('/api/authenticated')
          .then(response => {
            if (response.ok == false) {
              window.location = "/login"
            }
          })
    fetch(`./api/userBookings/`, safeCredentials())
          .then(handleErrors)
          .then(data => {
            console.log(data.bookings)
            this.setState({
              bookings: data.bookings,
            })

          })
  }

  
  render () {
    const { bookings } = this.state;
    return (
        <Layout>
          <div className="container pt-4">
          <h1 className="mb-1 header">Your Bookings</h1>
          <div className="row mt-3">
            {bookings.map(function(booking, index) {
              if (booking.is_paid) {
                return (
                  <div key={index} className="col-6 col-lg-4 mb-4 property">
                    <p className="text-uppercase mb-0 text-secondary"><b>
                      {booking.property_title}</b></p>
                    <p className="text-uppercase mb-0 text-secondary"><b>Start Date: {booking.start_date}</b></p>
                    <p className="text-uppercase mb-0 text-secondary"><b>End Date: {booking.end_date}</b></p>
                    <a href={`http://localhost:3000/property/${booking.property_id}`} className="text-decoration-none">View Property Listing</a>
                    <p className="text-uppercase text-secondary"><b>Booking is fully Paid</b></p>
                  </div>
                )
              } else {
                return (
                  <div key={index} className="col-6 col-lg-4 mb-4 property">
                    <p className="text-uppercase mb-0 text-secondary"><b>
                      {booking.property_title}</b></p>
                    <p className="text-uppercase mb-0 text-secondary"><b>Start Date: {booking.start_date}</b></p>
                    <p className="text-uppercase mb-0 text-secondary"><b>End Date: {booking.end_date}</b></p>
                    <a href={`http://localhost:3000/property/${booking.property_id}`} className="text-decoration-none">View Property Listing</a><br/>
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