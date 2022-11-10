import React from "react";
import Layout from "../layout";

class Listings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        listings: []
        };
    }
    
    render() {
        return (
            <Layout>
        <div>
            <h1>Listings</h1>
            <div>
            {this.state.listings.map(listing => {
                return (
                <div key={listing.id}>
                    <h3>{listing.title}</h3>
                    <p>{listing.description}</p>
                </div>
                );
            })}
            </div>
        </div>
        </Layout>
        );
    }
}

export default Listings;

