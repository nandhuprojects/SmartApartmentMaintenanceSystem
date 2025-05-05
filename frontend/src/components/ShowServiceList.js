import React, { Component } from 'react';
import axios from 'axios';
import ServiceCard from './Cards';
import { Link } from 'react-router-dom';  // Import Link
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class ShowServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: []
    };
  }

  componentDidMount() {
	axios({
	  method: 'post',
	  url: 'services',
	  baseURL: 'http://localhost:8082/',
	  data: {
		role : this.props.role
	  }
	}).then(res => {
		this.setState({
		  services: res.data
		})
	  })
	  .catch(err =>{
		console.log('Error from ShowServiceList');
	  });

  };


  render() {
    const services = this.state.services;
    let serviceList;

    if(!services) {
      serviceList = "there is no service record!";
    } else {
      serviceList = services.map((service, k) =>
        <ServiceCard service={service} key={k} />
      );
    }

    return (
      <div className="ShowServiceList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Services List</h2>
            </div>
          <div className="list " style={{margin :"auto"}}>
                {serviceList}
                {this.props.role === "association" && (
    <Card style={{ width: '18rem', textAlign: 'center', marginTop: '20px' }}>
      <Card.Img variant="top" style={{ width: "100px", margin: "auto", marginTop: '10px' }} src="/images/gallery/flat_management.png" />
      <Card.Body>
        <Card.Title>Flat Management</Card.Title>
        <Card.Text>Manage all flats in the system</Card.Text>
        <Link to="/dashboard/manage-flats">
          <Button variant="primary">Click Here</Button>
        </Link>
      </Card.Body>
    </Card>
)}

                {this.props.role === "association" && (
                <Card style={{ width: '18rem', textAlign: 'center', marginTop: '20px' }}>
                  <Card.Img variant="top" style={{ width: "100px", margin: "auto", marginTop: '10px' }} src="/images/gallery/user-management.png" />
                  <Card.Body>
                    <Card.Title>User Management</Card.Title>
                    <Card.Text>Manage all users in the system</Card.Text>
                    <Link to="/dashboard/manage-users">
                      <Button variant="primary">Click Here</Button>
                    </Link>
                  </Card.Body>
                </Card>
              )}
          </div>
        </div>
      </div>
	   </div>
     
    );
  }
}

export default ShowServiceList;
