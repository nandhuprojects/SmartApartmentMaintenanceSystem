import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ManageFlats = () => {
    const [flats, setFlats] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [flat, setFlat] = useState({
        flatid: null,
        blockno: "",
        flatno: "",
        ownerid: "",
        tenantid: "",
        status: "vacant",
        bhk: "",
        sqft: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchFlats();
    }, []);
    
    const fetchFlats = async () => {
        try {
            const response = await fetch("http://localhost:8082/getFlats");
            const data = await response.json();
            setFlats(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching flats:", error);
        }
    };

    const handleChange = (e) => {
        setFlat({ ...flat, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Ensure tenantid is NULL if empty
        const cleanedFlat = { ...flat, tenantid: flat.tenantid ? flat.tenantid : null };
    
        const url = isEditing 
            ? `http://localhost:8082/updateFlat/${flat.flatid}` 
            : "http://localhost:8082/addFlat";
        const method = isEditing ? "PUT" : "POST";
    
        try {
            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanedFlat),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            alert(result.message);
            setShowForm(false);
            fetchFlats(); // Refresh list after adding
        } catch (error) {
            console.error("Error submitting flat:", error);
            alert("Failed to submit flat. Check console for details.");
        }
    };
    

    const handleEdit = (flat) => {
        setFlat(flat);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (flatid) => {
        if (window.confirm("Are you sure you want to delete this flat?")) {
            await fetch(`http://localhost:8082/deleteFlat/${flatid}`, { method: "DELETE" });
            fetchFlats();
        }
    };

    return (
        <div className="manage-flats-container">
            {/* <h2 className="manage-flats-title">Flat Management</h2> */}
            <div className="manage-flats-header">
                <button className="back-btn" onClick={() => window.history.back()}>← Back</button>
                <h2 className="manage-flats-title">Flat Management</h2>
            </div>
            <div className="flats-container">
    {flats.length > 0 ? (
        flats.map((f) => (
            <div key={f.flatid} className="flat-card">
                <p><strong>Flat ID:</strong> {f.flatid}</p>
                <p><strong>Block No:</strong> {f.blockno}</p>
                <p><strong>Flat No:</strong> {f.flatno}</p>
                <p><strong>Owner ID:</strong> {f.ownerid}</p>
                <p><strong>Tenant ID:</strong> {f.tenantid || "None"}</p>
                <p><strong>Status:</strong> {f.status}</p>
                <p><strong>BHK:</strong> {f.bhk}</p>
                <p><strong>Square Feet:</strong> {f.sqft}</p>
                
                <button className="edit-btn" onClick={() => handleEdit(f)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(f.flatid)}>Delete</button>
            </div>
            ))
        ) : (
            <p>No flats available</p>
        )}
            </div>


            <div className="add-flat-btn">
            <Button variant="primary" onClick={() => setShowForm(true)}>+ Add Flat</Button>
            </div>

            <Modal show={showForm} onHide={() => setShowForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? "Edit Flat" : "Add New Flat"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Block No</label>
                            <input type="text" name="blockno" className="form-control" value={flat.blockno} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Flat No</label>
                            <input type="text" name="flatno" className="form-control" value={flat.flatno} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Owner ID</label>
                            <input type="text" name="ownerid" className="form-control" value={flat.ownerid} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Tenant ID</label>
                            <input type="text" name="tenantid" className="form-control" value={flat.tenantid} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" className="form-control" value={flat.status} onChange={handleChange}>
                                <option value="vacant">Vacant</option>
                                <option value="occupied">Occupied</option>
                                <option value="sale">For Sale</option>
                                <option value="rent">For Rent</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>BHK</label>
                            <input type="text" name="bhk" className="form-control" value={flat.bhk} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Square Feet</label>
                            <input type="text" name="sqft" className="form-control" value={flat.sqft} onChange={handleChange} required />
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowForm(false)}>Close</Button>
                            <Button variant="primary" type="submit">{isEditing ? "Update Flat" : "Add Flat"}</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ManageFlats;
