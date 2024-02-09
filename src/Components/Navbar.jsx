import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { app } from '../Firebase'

function Navbar() {
    let navigate = useNavigate();
    let location = useLocation();
    const [ProfilePhoto, setProfilePhoto] = useState(null)
    const [userName, setuserName] = useState(null)
    const [useremail, setuserEmail] = useState(null)
    const [userNumber, setuserNumber] = useState(null)

    const handleLogout = (event) => {
        event.preventDefault();
        const auth = getAuth(app);
        signOut(auth).then(res => {

            localStorage.removeItem('YoutubeToken')
            navigate('/login')
        })
            .catch(error => {
                console.log(error);
            });

    }

    useEffect(() => {
        const auth = getAuth(app);

        const userAuthenticate = onAuthStateChanged(auth, (user) => {

            let storeToken = localStorage.getItem('YoutubeToken')
            if (user && storeToken) {
                 setProfilePhoto(user.photoURL)
                setuserName(user.displayName)
                setuserEmail(user.email)
                setuserNumber(user.phoneNumber)

                // check Token expier or not..
                const userToken = user.accessToken

                if (storeToken === userToken) {
                    console.log("Password Match True!")
                } else {
                    console.log("Password Match false!")
                    alert("Your Sesion Out!!")
                    localStorage.removeItem('YoutubeToken')
                    navigate('/login')

                }

            } else {
                console.log('user not login..', user);
                navigate('/login')

            }

        })


        return () => userAuthenticate
    })



    return (
        <Container>
            <nav className="navbar navbar-expand-lg  ">
                <div className="container-fluid">
                    <div className="mx-2" >
                        <img style={{ borderRadius: "50%", height: "2rem" }}
                            src={ProfilePhoto ? ProfilePhoto : 'https://img.icons8.com/pastel-glyph/64/user-male-circle.png'}
                            alt="img"
                            title={userName ? userName : useremail || userNumber} />
                        <span className='mx-3'>{userName ? userName : useremail || userNumber} </span>
                    </div>


                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse  " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link  ${location.pathname === '/main/home' ? "active" : ""} `} aria-current="page" to="/main/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link   ${location.pathname === 'main/about' ? "active" : ""} `} aria-current="page" to="/main/about">About</Link>
                            </li>
                        </ul>
                        <div className='responsive'>
                            {!localStorage.getItem('YoutubeToken') || location.pathname === '/login' ?
                                <form className="d-flex" role="search">
                                    <Link className={`${location.pathname === '/login' ? "bg-success text-white" : ""} button btn btn-sm btn-outline-success mx-1`} to="/login" type="submit">Login</Link>
                                    <Link className={`${location.pathname === '/signup' ? "bg-success text-white" : ""} button btn btn-sm btn-outline-success mx-3`} to="/signup" type="submit">Signup</Link>
                                </form> : <button onClick={handleLogout} className="button btn-sm btn btn-primary mx-2"> Logout</button>
                            }
                        </div>
                    </div>

                </div>
            </nav>
        </Container>
    )
}
const Container = styled.div`
ul{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.responsive{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
 `
export default Navbar