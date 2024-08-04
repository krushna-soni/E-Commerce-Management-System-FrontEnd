import axios from 'axios';
import React, { useEffect, useState } from 'react';
import loader from '../Assets/loader.gif';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');

  let navigate = useNavigate();
  const detailRoute = (id) => {
    navigate(`/dashboard/detail/${id}`);
  };
  const editRoute =(id)=>{
    navigate(`/dashboard/edit/${id}`);
  }
  const deleteData = (id, imgLink) => {
    if (window.confirm('Are you sure?')) {
      axios.delete(`https://e-commerce-management-system-back-end.vercel.app/category?id=${id}&imageUrl=${imgLink}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then((response) => {
          console.log(response);
          getData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };  

  const getData=()=>{
    axios.get('https://e-commerce-management-system-back-end.vercel.app/category',{
      headers:{
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then((response) => {
      setLoading(false);
      setHasError(false);
      setCategoryList(response.data.category); // Adjust according to your API response structure
    })
    .catch ((error)=>{
      console.log('Error fetching categories:', error);
      setLoading(false);
      setHasError(true);
      setError(error.response.data.msg);
    })
  }

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  return (
    <>
      {isLoading && <div>
        <img style={{ width: '150px' }} src={loader} alt="Loading" />
      </div>}
      {!isLoading && !hasError && <div>
        <h1>List of Categories</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {categoryList?.map(data => <Row key={data._id} detail={data} detailReq={detailRoute} editReq={editRoute} delReq={deleteData} />)}
          </tbody>
        </table>
      </div>}
      {hasError && <div>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>}
    </>
  );
};

const Row = (props) => {
  return (
    <tr>
      <td>{props.detail.name}</td>
      <td><img style={{ width: '150px' }} src={props.detail.photo} alt={props.detail.name} /></td>
      <td><button onClick={() => { props.detailReq(props.detail._id) }}>Detail</button></td>
      <td><button onClick={() =>{props.editReq(props.detail._id)}}>Edit</button></td>
      <td><button onClick={() => props.delReq(props.detail._id, props.detail.photo)}>Delete</button></td>
    </tr>
  );
}

export default Category;
