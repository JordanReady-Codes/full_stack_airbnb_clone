import React from "react";
import Layout from "../layout";
import { safeCredentials, handleErrors } from "@utils/fetchHelper";

import "./propertyBookings.scss";


class PropertyBookings extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
          bookings: []
        }
  
      }
  
    componentDidMount() { 
      const id = window.location.pathname.split("/")[2];
      console.log(id);

      fetch(`/api/properties/${id}/bookings`, safeCredentials())
            .then(handleErrors)
            .then(data => {
              console.log(data.bookings);
              this.setState({
                bookings: data.bookings
              })
            })
    }

    calculateTotalPrice({startDate, endDate}) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays * this.props.price;
    }

  
    render() {
        const { bookings } = this.state;
        const { title } = bookings[0] ? bookings[0].property : '';

        return (
            <Layout>
                <div className="container property-bookings">
                    <h1 className="header"> {title} Bookings</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Paid?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => {
                                return (
                                    <tr key={booking.id}>
                                        <td>{booking.start_date}</td>
                                        <td>{booking.end_date}</td>
                                        <td>{booking.is_paid ? "Yes" : "No"}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </Layout>
        )
    }
}
  
  export default PropertyBookings;