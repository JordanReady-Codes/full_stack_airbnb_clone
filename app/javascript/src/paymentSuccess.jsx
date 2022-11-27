import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';
import './paymentSuccess.scss';

class PaymentSuccess extends React.Component {
  constructor(props) {
    super(props); 
      this.state = {
      booking: {},
      property: {},
      }
  }

  componentDidMount() {
    const bookingId = window.location.pathname.split('/')[2];
    fetch(`/api/bookings/${bookingId}` )
          .then(handleErrors)
          .then(data => {
            console.log(data.booking);
            console.log(data.booking.property);
            this.setState({
              booking: data.booking,
              property: data.booking.property
            })
          })
  }

  render () {
    const { booking, property } = this.state;

    return (
      <Layout>
        <div className="container pt-4">
          <h2 className='header'>Your Booking is Complete, Payment was Successful!</h2>
          <h4 className='header mb-3'>Enjoy your stay!</h4>
          <div className="booking-card shadow">
          <h2 className='booking-title'>{property.title}</h2>
          <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})` }} />
            <h5 className='booking-info'>{property.city}, {property.country}</h5>
            <h5 className="booking-info">Booking start date: {booking.start_date}</h5>
            <h5 className="booking-info">Booking end date: {booking.end_date}</h5>
            <a href={`/property/${property.id}`} className="btn booking-btn">View Property</a>
          </div>
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <PaymentSuccess />,
    document.body.appendChild(document.createElement('div')),
  )})