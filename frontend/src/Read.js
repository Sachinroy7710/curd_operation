import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Read = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8085/curd/' + id)
            .then(res => {
                console.log(res);
                setStudent(res.data[0]); // Set the first student object directly
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>;
    }

    if (!student) {
        return <div className="d-flex vh-100 justify-content-center align-items-center">
            <h3>No student found</h3>
        </div>;
    }

    return (
        <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
            <div className="w-50 p-4 bg-white shadow-lg rounded">
                <h2 className="text-center mb-4">Student Details</h2>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <p><strong>ID:</strong> {student.id}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Name:</strong> {student.name}</p>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <p><strong>Email:</strong> {student.email}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Age:</strong> {student.age}</p>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <p><strong>Role:</strong> {student.role}</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <Link to="/" className="btn btn-outline-primary">Back</Link>
                    <Link to={`/Update/${student.id}`} className="btn btn-primary">Edit</Link>
                </div>
            </div>
        </div>
    );
}

export default Read;
