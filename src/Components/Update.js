import axios from 'axios';
import React, { useEffect, useState } from 'react';
import imglogo from '../Assets/imglogo.png';
import loader from '../Assets/loader.gif';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [category, setCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(imglogo);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://krushna-soni-e-commerce-management-system-back-end.vercel.app/category/${params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setLoading(false);
        setHasError(false);
        console.log(response.data.category);
        setCategory(response.data.category.name); // Adjust according to your API response structure
        setImgUrl(response.data.category.photo); // Adjust according to your API response structure
      } catch (error) {
        setLoading(false);
        setHasError(true);
        setError(error.response ? error.response.data.message : 'Network Error');
        console.log(error.response ? error.response.data.message : error.message);
      }
    };

    fetchCategory();
  }, [params.id]);

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

    axios.put(`https://krushna-soni-e-commerce-management-system-back-end.vercel.app/category/${params.id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        console.log(res);
        setHasError(false);
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
        <h1>Update the Category</h1>
        <form onSubmit={submitHandler}>
          <input value={category} onChange={(e) => { setCategory(e.target.value); }} type="text" />
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

export default Update;
