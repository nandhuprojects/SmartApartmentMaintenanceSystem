import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Header from './Header';

class Clubhouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facilities: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8082/clubhouse')
      .then(res => {
        this.setState({ facilities: res.data });
      })
      .catch(err => {
        console.error('Error fetching clubhouse facilities', err);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <div style={{ marginTop: '100px', textAlign: 'center' }}>
          <h1>Clubhouse Facilities</h1>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
          {this.state.facilities.length === 0 ? (
            <p>No facilities available</p>
          ) : (
            this.state.facilities.map((facility, index) => (
              <Card key={index} style={{ width: '22rem', margin: '10px', padding: '15px' }}>
                <Card.Img 
                  variant="top" 
                  src={window.location.origin + '/' + facility.image}  
                  alt={facility.name} 
                  style={{ height: '200px', objectFit: 'cover' }} 
                />
                <Card.Body>
                  <Card.Title style={{ textAlign: 'center' }}>{facility.name}</Card.Title>
                  <Card.Text>{facility.description}</Card.Text>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Clubhouse;
