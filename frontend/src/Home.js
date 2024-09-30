import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(); // Fetch data when the component is mounted
    }, []);

    // Function to fetch the data
    const fetchData = () => {
        axios.get('http://localhost:8085/curd')
            .then(res => {
                console.log('Fetched data:', res.data);
                setData(res.data); // Update state with fetched data
            })
            .catch(err => console.log('Error fetching data:', err));
    };

    // Function to handle delete
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            axios.delete(`http://localhost:8085/curd/${id}`)
                .then(res => {
                    console.log('Record deleted:', res.data);
                    fetchData(); // Re-fetch data to update the table after deletion
                })
                .catch(err => console.log('Error deleting record:', err));
        }
    };

    return (
        <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded shadow p-4'>
                <h2 className='text-center mb-4'>Student List</h2>
                <div className='d-flex justify-content-end mb-3'>
                    <Link to="/create" className='btn btn-success'>Create +</Link>
                </div>
                <table className='table table-striped table-bordered'>
                    <thead className='table-dark'>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="6" className='text-center'>No students found</td>
                            </tr>
                        ) : (
                            data.map((curd, index) => (
                                <tr key={index}>
                                    <td>{curd.id}</td>
                                    <td>{curd.name}</td>
                                    <td>{curd.email}</td>
                                    <td>{curd.age}</td>
                                    <td>{curd.role}</td>
                                    <td>
                                        <Link to={`/Read/${curd.id}`} className='btn btn-sm btn-info'>Read</Link>
                                        <Link to={`/Update/${curd.id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                        <button
                                            className='btn btn-sm btn-danger'
                                            onClick={() => handleDelete(curd.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
