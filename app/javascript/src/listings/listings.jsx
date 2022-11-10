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
    }

  componentDidMount() {
    this.getUsername();
    this.getProperties();
  }

  getUsername() {
    fetch('/api/authenticated', safeCredentials({
      method: 'GET',
      }))
      .then(handleErrors)
      .then(data => {
        this.setState({
          username: data.username,
        })
    })
  }
  
  getProperties() {
    fetch(`/api/properties`, safeCredentials({
      method: 'GET',
      }))
      .then(handleErrors)
      .then(data => {
        this.setState({
          properties: data.properties,
        })
    })
  }

  render() {
    const { properties, username } = this.state;
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="heading mb-5">
                Your Listings {username}
              </h1>
            </div>
          </div>
          <div className="row">
            {properties.map(property => (
              <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4" key={property.id}>
                <div className="card">
                  <img src={property.image_url} className="card-img-top" alt={`${property.title} image`} />
                  <div className="card-body">
                    <h5 className="card-title">{property.title}</h5>
                    <p className="card-text">{property.description}</p>
                    <a href={`/properties/${property.id}`} className="btn custom-button">
                      View Listing
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Listings;

