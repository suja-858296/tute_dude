import { useState } from 'react';
import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Navbar from './components/navbar';
import Dashboard from './components/dashboard';





function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/><Home/></>
    },
    {
      path:"/login",
      element:<><Navbar/><Login/></>
    },
    {
      path:"/signUp",
      element:<><Navbar/><SignUp/></>
    },
    {
      path:"/dashboard",
      element:<><Navbar/><Dashboard/></>
    },
  ]);

  return (
    <>
    
    <RouterProvider router={router}/>
    </>
  )
}

export default App
