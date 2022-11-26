import React from "react";
import Layout from "../layout";
import { safeCredentials, handleErrors } from "@utils/fetchHelper";

import "./listings.scss";

class Listings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            properties: [],
        }

        this.getUsername = this.getUsername.bind(this);
        this.getProperties = this.getProperties.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

  componentDidMount() {
    this.getUsername();
    this.getProperties();
  }

  getUsername() {
    fetch('/api/authenticated', safeCredentials({
      method: 'GET',
      }))
      .then(response => {
        if (response.ok == false) {
          window.location = "/login"
        }
      })
      .then(handleErrors)
      .then(data => {
        this.setState({
          username: data.username,
        })
    })
  }
  
  getProperties() {
    fetch(`/api/userProperties`, safeCredentials({
      method: 'GET',
      }))
      .then(handleErrors)
      .then(data => {
        console.log("data", data)

        this.setState({
          properties: data.properties,
        })
    })
  }

  handleDelete(e) {
    e.preventDefault();
    let id = e.target.id;
    console.log("id", id)
    fetch(`/api/properties/${id}`, safeCredentials({
      method: 'DELETE',
      }))
      .then(handleErrors)
      
  }


  render() {
    const { properties, username } = this.state;
    return (
      <Layout>
        <div className="container px-4">
        <h1 className="header mb-1">My Listings</h1>
          <div className="row mt-3 gx-5">
            {properties.map(property => (
              <div key={property.id} className="col-6 col-lg-4 mb-4 listing-card">
                <p className="listing-title mb-0">{property.title}</p>
                <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})` }} />
                  <p className="listing-info mb-0">Location: {property.city}</p>
                  <p className="listing-info mb-0">Price: ${property.price_per_night}</p>
                  <a href={`/editListing/${property.id}`} className="btn btn-primary mb-2">Edit</a>
                  <button id={property.id} className="btn btn-danger mb-2" onClick={this.handleDelete}>Delete</button>
                  <a href={`/property/${property.id}/bookings`} className="btn btn-success mb-2">View Bookings</a>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Listings;

