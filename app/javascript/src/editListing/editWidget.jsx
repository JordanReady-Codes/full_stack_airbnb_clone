import React from "react";
import Layout from "../layout";
import { safeCredentials, handleErrors, safeCredentialsForm } from "@utils/fetchHelper";

import "./editListing.scss";


class EditWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            property: {
                id: "",
                title: '',
                description: '',
                city: '',
                country: '',
                property_type: '',
                price_per_night: '',
                max_guests: '',
                bedrooms: '',
                beds: '',
                baths: '',
                image_url: '',
                images: [],
            },
            errors: {}
        }
    }

    componentDidMount() {
        const id = window.location.pathname.split("/")[2];
        fetch(`/api/properties/${id}`, safeCredentials())
            .then(handleErrors)
            .then(data => {
                this.setState({
                    property: data.property
                })
            })
            
    }


    submitProperty = (e) => {
        e.preventDefault();
        const id = window.location.pathname.split('/')[2];
        let fileSelect = document.getElementById('fileSelect');
        let formData = new FormData();
        for (let i = 0; i < fileSelect.files.length; i++) {
            formData.append('property[images][]', fileSelect.files[i]);
        }

        formData.append('property[title]', this.state.title);
        formData.append('property[description]', this.state.description);
        formData.append('property[city]', this.state.city);
        formData.append('property[country]', this.state.country);
        formData.append('property[property_type]', this.state.property_type);
        formData.append('property[price_per_night]', this.state.price_per_night);
        formData.append('property[max_guests]', this.state.max_guests);
        formData.append('property[bedrooms]', this.state.bedrooms);
        formData.append('property[beds]', this.state.beds);
        formData.append('property[baths]', this.state.baths);
        
        fetch(`/api/properties/${id}`, safeCredentialsForm({
            method: 'PUT',
            body: formData,
            headers: { 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content }
        }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => {
            window.location.href = '/listings';
        })
        .catch(error => console.log(error.message));
    }

      render() {
        return (
          <Layout>
            <div className="container shadow-lg rounded">
            <form onSubmit={this.submitProperty}>
                <h1 className="header"> Edit your Listing </h1>
                <h6 className="header"> Please fill in all fields </h6>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Enter title" onChange={(e) => this.setState({title: e.target.value})} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" placeholder="Enter description" onChange={(e) => this.setState({description: e.target.value})} />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" className="form-control" id="city" placeholder="Enter city" onChange={(e) => this.setState({city: e.target.value})} />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input type="text" className="form-control" id="country" placeholder="Enter country" onChange={(e) => this.setState({country: e.target.value})} />
                </div>
                <div className="form-group">
                    <label htmlFor="property_type">Property Type</label>
                    <input type="text" className="form-control" id="property_type" placeholder="Enter property type" onChange={(e) => this.setState({property_type: e.target.value})} />
                </div>
                <div className="form-group">
                    <label htmlFor="price_per_night">Price Per Night</label>
                    <input type="text" className="form-control" id="price_per_night" placeholder="Enter price per night" onChange={(e) => this.setState({price_per_night: e.target.value})} />
                </div>
                <div className="form-group">
                    <label htmlFor="max_guests">Max Guests</label>
                    <input type="text" className="form-control" id="max_guests" placeholder="Enter max guests" onChange={(e) => this.setState({max_guests: e.target.value})} />
                </div>
                <div className="form-group">
                    <label htmlFor="bedrooms">Bedrooms</label>
                    <input type="text" className="form-control" id="bedrooms" placeholder="Enter bedrooms" onChange={(e) => this.setState({bedrooms: e.target.value})} />
                </div>
                <div className="form-group">
                    <label htmlFor="beds">Beds</label>
                    <input type="text" className="form-control" id="beds" placeholder="Enter beds" onChange={(e) => this.setState({beds: e.target.value})} />
                </div>
                <div className="form-group">
                    <label htmlFor="baths">Baths</label>
                    <input type="text" className="form-control" id="baths" placeholder="Enter baths" onChange={(e) => this.setState({baths: e.target.value})} />
                </div>
                <div className="form-group">
                    <label htmlFor="images">Images</label>
                    <input type="file" className="form-control" id="fileSelect" multiple onChange={(e) => this.setState({images: e.target.value})} />
                </div>
                <button type="submit" className="btn color-main my-2">Submit</button>
            </form>
            </div>

          </Layout>
        )
      }
    
    }

export default EditWidget;