import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'C:/Notes/Full Stack/3_React/2-CRUD app/2-crud-app/src/MainNav.css'; // Import the CSS file

const MainNav = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="main-nav">
      <div className="nav-links">
        <Link to="/dashboard/category" className="nav-link">Category List</Link>
        <Link to="/dashboard/add-category" className="nav-link">Add Category</Link>
      </div>
      <div className="user-info">
        <p>Hello, {localStorage.getItem('userName')}</p>
        <button onClick={logoutHandler} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default MainNav;
