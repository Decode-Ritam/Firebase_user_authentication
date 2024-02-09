import React from 'react'
import './index.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { isLogin } from '../src/Utility/CheckAuth'

import styled from 'styled-components'
import Login from './Components/Login'
import Signup from './Components/Signup';
 import About from './Components/About';
import RootLayout from './Components/RootLayout';
import LoginPhone from './Components/LoginPhone';
import Home from './Components/Home';


function App() {


  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "login", element: <Login /> },
    { path: "loginOTP", element: <LoginPhone /> },
    { path: "signup", element: <Signup /> },
    {
      path: "main", loader: isLogin, element: <RootLayout />, children: [
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
      ]
    }
  ]);

  return (
    <Container>
      <RouterProvider router={router}></RouterProvider>
    </Container>
  )
}
const Container = styled.div`
    background: #d3f4ff;
 `
export default App