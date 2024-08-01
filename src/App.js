import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import './App.css';
import AddCategory from './Components/AddCategory';
import Category from './Components/Category';
import RootLayout from './Components/RootLayout';
import Detail from './Components/Detail';
import Update from './Components/Update';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { isLogin } from './util/checkAuth';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  {
    path: '/dashboard',
    loader: isLogin,
    element: <RootLayout />,
    children: [
      { path: '', element: <Category /> },
      { path: 'category', element: <Category /> },
      { path: 'add-category', element: <AddCategory /> },
      { path: 'detail/:id', element: <Detail /> },
      { path: 'edit/:id', element: <Update /> }
    ]
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
