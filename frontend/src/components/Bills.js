import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Header from './Header';

class Bills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
      showModal: false,
      flat_id: "",
      water: 0,
      gas: 0,
      electricity: 0,
    };
  }

  componentDidMount() {
    this.fetchBills();
  }

  fetchBills = () => {
    axios.post('http://localhost:8082/bills', { user: this.props.user.userid })
      .then(res => {
        this.setState({ bills: res.data });
      })
      .catch(err => {
        console.log('Error from Bills');
      });
  };

  handleAddBill = () => {
    const { flat_id, water, gas, electricity } = this.state;
    axios.post('http://localhost:8082/addbill', {
      flat_id,
      water,
      gas,
      electricity,
      role: this.props.user.role
    })
    .then(() => {
      this.setState({ showModal: false });
      this.fetchBills();
    })
    .catch(err => console.error('Error adding bill', err));
  };

  render() {
    const { bills, showModal } = this.state;
    const { role } = this.props.user;

    return (
      <div>
        <Header />
        
        {/* Title */}
        <div style={{ marginTop: '100px', textAlign: 'center', marginBottom: '20px' }}>
          <h1>Bill Management</h1>
        </div>

        {/* Bill List */}
        <div className="list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', padding: '20px' }}>
          {bills.length === 0 ? "No Bills to Display!" : bills.map((bill, k) => (
            <BillCard key={k} bill={bill} />
          ))}
        </div>

        {/* Add Bill Button (Only for association users) */}
        {role === "association" && (
          <Button
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              borderRadius: "50%",
              padding: "15px",
              fontSize: "20px",
            }}
            onClick={() => this.setState({ showModal: true })}
          >
            Add bill
          </Button>
        )}

        {/* Add Bill Modal */}
        <Modal show={showModal} onHide={() => this.setState({ showModal: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Add Bill</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Flat ID</Form.Label>
                <Form.Control type="text" onChange={(e) => this.setState({ flat_id: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Water Usage (kL)</Form.Label>
                <Form.Control type="number" onChange={(e) => this.setState({ water: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Gas Usage (Cylinders)</Form.Label>
                <Form.Control type="number" onChange={(e) => this.setState({ gas: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Electricity Usage (kWh)</Form.Label>
                <Form.Control type="number" onChange={(e) => this.setState({ electricity: e.target.value })} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleAddBill}>
              Save Bill
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function BillCard({ bill }) {
  const wcost = bill.water * 4;
  const gcost = bill.gas * 825;
  const ecost = bill.electricity > 100 ? (bill.electricity - 100) * 1.5 : 0;
  const maint = bill.area * 3;
  const total = wcost + gcost + ecost + maint;

  return (
    <Card style={{ width: '22rem', margin: '10px', fontSize: '130%', padding: '15px', backgroundColor: '#f7e6ff' }}>
      <Card.Title style={{ textAlign: 'center' }}>Flat {bill.flat_no}</Card.Title>
      <hr style={{ height: '4px' }} />
      <Card.Text>
        <table style={{ width: '100%', textAlign: 'left' }}>
          <tbody>
            <tr><th>Utility</th><th>Units</th><th>Cost</th></tr>
            <tr><td>Water (kL)</td><td>{bill.water}</td><td>{wcost}</td></tr>
            <tr><td>Gas (cylinder)</td><td>{bill.gas}</td><td>{gcost}</td></tr>
            <tr><td>Electricity</td><td>{bill.electricity}</td><td>{ecost}</td></tr>
            <tr><td>Maintenance</td><td>-</td><td>{maint}</td></tr>
            <tr><td><b>Total</b></td><td>-</td><td>Rs. {total}</td></tr>
          </tbody>
        </table>
      </Card.Text>
    </Card>
  );
}

export default Bills;
