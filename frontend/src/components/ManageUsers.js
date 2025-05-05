import React, { useState, useEffect } from "react";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [user, setUser] = useState({
        userid: null,
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        mobile: "",
        role: "tenant"
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:8082/getUsers");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isEditing ? `http://localhost:8082/updateUser/${user.userid}` : "http://localhost:8082/addUser";
        const method = isEditing ? "PUT" : "POST";

        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        const result = await response.json();
        alert(result.message);
        
        setUser({ userid: null, first_name: "", last_name: "", username: "", password: "", mobile: "", role: "tenant" });
        setIsEditing(false);
        setShowForm(false);
        fetchUsers(); 
    };

    const handleEdit = (user) => {
        setUser(user);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (userid) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await fetch(`http://localhost:8082/deleteUser/${userid}`, { method: "DELETE" });
            fetchUsers();
        }
    };

    return (
        <div className="manage-users-container">
            {/* <h2 className="manage-users-title">User Management</h2> */}
            <div className="manage-flats-header">
                <button className="back-btn" onClick={() => window.history.back()}>← Back</button>
                <h2 className="manage-flats-title">User Management</h2>
            </div>

            <div className="users-container">
                {users.map((u) => (
                    <div key={u.userid} className="user-card">
                        <p><strong>User ID:</strong> {u.userid}</p>
                        <p><strong>First Name:</strong> {u.first_name}</p>
                        <p><strong>Last Name:</strong> {u.last_name}</p>
                        <p><strong>Username:</strong> {u.username}</p>
                        <p><strong>Password:</strong> {u.password}</p>
                        <p><strong>Mobile:</strong> {u.mobile}</p>
                        <p><strong>Role:</strong> {u.role}</p>
                        <button className="edit-btn" onClick={() => handleEdit(u)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(u.userid)}>Delete</button>
                    </div>
                ))}
            </div>

            <button className="floating-add-btn" onClick={() => setShowForm(true)}>+</button>

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{isEditing ? "Edit User" : "Add User"}</h3>
                        <form onSubmit={handleSubmit} className="user-form">
                            <input type="text" name="first_name" placeholder="First Name" value={user.first_name} onChange={handleChange} required />
                            <input type="text" name="last_name" placeholder="Last Name" value={user.last_name} onChange={handleChange} required />
                            <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} required />
                            <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required={!isEditing} />
                            <input type="text" name="mobile" placeholder="Mobile" value={user.mobile} onChange={handleChange} required />
                            <select name="role" value={user.role} onChange={handleChange}>
                                <option value="tenant">Tenant</option>
                                <option value="owner">Owner</option>
                                <option value="association">Association</option>
                                <option value="security">Security</option>
                                <option value="housekeeper">Housekeeper</option>
                            </select>
                            <button type="submit">{isEditing ? "Update User" : "Add User"}</button>
                        </form>
                        <button className="close-btn" onClick={() => setShowForm(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
