import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [student, setStudent] = useState({
        name: '',
        email: '',
        age: '',
        role: ''
    });

    useEffect(() => {
        // Fetch the current student data
        axios.get(`http://localhost:8085/curd/${id}`)
            .then(res => {
                setStudent(res.data[0]); // Assuming res.data contains the student object
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8085/curd/${id}`, student)
            .then(res => {
                console.log(res.data);
                navigate('/'); // Use navigate to redirect after successful update
            })
            .catch(err => console.error(err));
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Update Student</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Name:</label>
                        <input
                            type='text'
                            name='name'
                            value={student.name}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label>Email:</label>
                        <input
                            type='email'
                            name='email'
                            value={student.email}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label>Age:</label>
                        <input
                            type='number'
                            name='age'
                            value={student.age}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label>Role:</label>
                        <input
                            type='text'
                            name='role'
                            value={student.role}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>Update</button>
                </form>
            </div>
        </div>
    );
};

export default Update;
