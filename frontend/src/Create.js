import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    age: '',
    role: ''
  });

  const navigate=useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation before submission
    if (!values.name || !values.email || !values.age || !values.role) {
      alert('Please fill in all fields');
      return;
    }

    axios.post('http://localhost:8085/curd', values)
      .then(res =>{
         console.log(res)
        navigate('/')})
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Add Employee</h2>
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter Name'
              className='form-control'
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter Email'
              className='form-control'
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='age'>Age</label>
            <input
              type='number'
              id='age'
              placeholder='Enter Age'
              className='form-control'
              onChange={(e) => setValues({ ...values, age: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='role'>Role</label>
            <input
              type='text'
              id='role'
              placeholder='Enter Role'
              className='form-control'
              onChange={(e) => setValues({ ...values, role: e.target.value })}
            />
          </div>

          <button type='submit' className='btn btn-success'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
