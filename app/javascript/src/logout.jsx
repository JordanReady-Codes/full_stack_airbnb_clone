import React from 'react';
import Layout from '@src/layout';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './logout.scss';


    class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            user_id: 0
        }
        
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        fetch('/api/authenticated')
        .then(handleErrors)
        .then(data => {
            this.setState({
            authenticated: data.authenticated,
            user_id: data.user_id
            })
        })
    }

    handleLogout(e) {
        e.preventDefault();
        const user = this.state.user_id
        fetch("/api/sessions/"+ user, safeCredentials ({
        method: "DELETE",
        }))
        this.setState({authenticated: false})
    }

    handleLogin(e) {
        e.preventDefault();
        window.location.href = "/login";
    }


  render () {
    const { authenticated } = this.state;
    if (authenticated) {
      return (
        <Layout>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                <div className="message-border shadow p-4">
                  <h2 className="mb-4 header">Do you really want to logout?</h2>
                  <button className="btn shadow" onClick={this.handleLogout}>Logout</button>
                  
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    };

    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="message-border p-4">
                <h2 className='mb-4 header'>You are now logged out!</h2>
                <button className="btn shadow" onClick={this.handleLogin}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Logout />,
    document.body.appendChild(document.createElement('div')),
  )})