import React,{Component} from 'react'
import axios from 'axios';
import {ComplaintsCard} from './Cards.js'
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaCommentDots } from 'react-icons/fa';

class Complaints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaints: [],
      role:props.role,
      showModal: false
    };
  }
  componentDidMount() {
    axios({
      method: 'post',
      url: 'dashboard/complaint',
      baseURL: 'http://localhost:8082/',
      data:{
        role:this.props.role,
        id:this.props.id
      }
    }).then(res => {
      this.setState({
        complaints: res.data
      })
      })
      .catch(err =>{
      console.log('Error from Complaints.js');
      });
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
   
    const { complaints, role, showModal } = this.state;
    let cList;
    if(complaints.length===0) {
      return(
      <div className="textz nothing-to-show" >  <center><img alt='image1' src="https://cdn.dribbble.com/users/45405/screenshots/2353058/gif-006-box.gif" height="500px" width="500px"/></center></div>
      )
    } else {
      cList = complaints.map((comp, k) =>
        <ComplaintsCard complaints={comp} role={role} key={k} />
      );
    }
    return (
      <div className="ShowServiceList complaintLedger label label-danger" style={{ marginTop: '100px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="display-4 text-center">Complaints Ledger</h2>
            </div>
            <div className="list" style={{ margin: "auto" }}>
              {complaints.length === 0 ? (
                <center><img alt='No complaints' src="https://cdn.dribbble.com/users/45405/screenshots/2353058/gif-006-box.gif" height="500px" width="500px"/></center>
              ) : (
                complaints.map((comp, k) => <ComplaintsCard complaints={comp} role={role} key={k} />)
              )}
            </div>
          </div>
        </div>
        
        {/* Floating Button to Open Modal */}
        <FaCommentDots className="floating-btn" size={70} onClick={this.toggleModal} />
        {/* <FaPlusCircle className="floating-btn" size={30} onClick={this.toggleModal} /> */}
        
        {/* Post Complaint Modal */}
        <PostComp show={this.state.showModal} handleClose={this.toggleModal} userid={this.props.id} />

      </div>
    );
  }
}
const PostComp = ({ show, handleClose, userid }) => {
  const submitHandler = (event) => {
    event.preventDefault();
    
    let data = {
      complaint: document.getElementById('complaint').value,
      flatno: document.getElementById('flatno').value,
      userid: userid
    };

    axios.post('http://localhost:8082/dashboard/postcomplaint', data)
      .then(res => {
        if (res.data === "Success") {
          alert("Complaint posted successfully!");
          handleClose(); // Close modal after successful submission
          window.location.reload();
        }
      });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Post Your Complaint</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submitHandler}>
          <label>Complaint Details</label>
          <textarea rows="4" cols="30" id="complaint" required /><br/><br/>

          <label>Flat Number</label>
          <input type="text" id="flatno" required /><br/><br/>

          <Button variant="dark" type="submit" block>Post</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};



class ResolveComp extends Component{
  constructor(props){
    super(props);
  }

  submitHandler(event){
    event.preventDefault();
    let data ={
      complaintid:this.props.match.params.id,
      action:document.getElementById('action').value
    }

    axios({
      method: 'post',
      url: 'complaint/resolve/action',
      baseURL: 'http://localhost:8082/',
      data:data
    }).then(res => {
			if(res.data === "Success"){
        alert("Update Action successfully!");
				//this.render();
        window.location.replace('/dashboard/complaint')
      }

		  })
  }

  render(){
    const backbtn = ()=>{
      window.location.replace('/dashboard/complaint')
    }
    return(
      <div >
      <Button style={{ float:'left', fontSize:'18px',marginLeft : '10%'}} variant="warning" onClick={backbtn}><b>&larr; Back</b></Button>
      <br/><br/><br/>
      <center><h4>Resolve the  Complaint</h4><br/>
      <form  className="resolvecomplaint" onSubmit={this.submitHandler.bind(this)} >
        Action Details<br/><textarea  rows='5' name="action" id="action"/><br/><br/>
        <br/>
      <center>  <input className="btn btn-dark btn-lg btn-block" type="submit" value="Done"/></center><br/>
        </form></center>
      </div>
    )
  }
}


export { Complaints, PostComp,ResolveComp};
