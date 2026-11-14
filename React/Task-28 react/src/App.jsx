import { useState } from 'react';
import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import SignUp from './components/signUp';
import Navbar from './components/navbar';






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
    }
  ]);

  return (
    <>
    
    <RouterProvider router={router}/>
    </>
  )
}

export default App
