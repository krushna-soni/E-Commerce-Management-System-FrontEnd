import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import loader from '../Assets/loader.gif';

const Detail = () => {
  const [category, setCategory] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');

  let params = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://e-commerce-management-system-back-end.vercel.app/category/${params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure the token is fetched correctly
          },
        });
        setLoading(false);
        setHasError(false);
        console.log('Category data:', response.data.category);
        setCategory(response.data.category); // Adjust according to your API response structure
      } catch (error) {
        setLoading(false);
        setHasError(true);
        if (error.response) {
          setError(error.response.data.message || 'Error fetching category data');
          console.log('Error response data:', error.response.data);
        } else {
          setError('Network Error');
          console.log('Error:', error.message);
        }
      }
    };

    fetchCategory();
  }, [params.id]);

  return (
    <>
      {isLoading && (
        <div>
          <img style={{ width: '150px' }} src={loader} alt="Loading" />
        </div>
      )}
      {!isLoading && !hasError && (
        <div>
          <img style={{ width: '250px' }} src={category.photo} alt={category.name} />
          <h1>{category.name}</h1>
        </div>
      )}
      {hasError && (
        <div>
          <p style={{ color: 'red' }}>Error: {error}</p>
        </div>
      )}
    </>
  );
};

export default Detail;
