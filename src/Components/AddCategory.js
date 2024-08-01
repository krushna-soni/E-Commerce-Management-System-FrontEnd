import axios from 'axios';
import React, { useState } from 'react';
import imglogo from '../Assets/imglogo.png';
import loader from '../Assets/loader.gif';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [category, setCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(imglogo);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const fileHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setImgUrl(URL.createObjectURL(event.target.files[0]));
  };

  const submitHandler = (event) => {
    event.preventDefault(); // Prevent reloading

    setLoading(true);

    const formData = new FormData();
    formData.append('name', category);
    formData.append('photo', selectedFile);

    axios.post('https://e-commerce-management-system-back-end.vercel.app/category', formData,{
      headers:{
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
      .then((res) => {
        console.log(res);
        setHasError(false)
        setLoading(false);
        navigate('/dashboard/category');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setHasError(true);
        setError(err.message);
      });
  };

  return (
    <>
      {isLoading && <div>
        <img style={{ width: '150px' }} src={loader} alt="Loading" />
      </div>}
      {!isLoading && <div>
        <h1>Add New Category</h1>
        <form onSubmit={submitHandler}>
          <input onChange={(e) => { setCategory(e.target.value) }} type="text" />
          <input onChange={fileHandler} type="file" />
          <button>Submit</button> <br />
          <img style={{ width: '150px' }} src={imgUrl} alt="Category" />
        </form>
      </div>}
      {hasError && <div>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>}
    </>
  );
};

export default AddCategory;
