import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth'
import { app } from '../Firebase'
import { useNavigate } from 'react-router-dom'
 
function Signup() {
    let navigate = useNavigate();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [notify, setnotify] = useState('');

    const onSubmitSignupHandler = (event) => {
        event.preventDefault();
        const auth = getAuth(app);

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setnotify('Congrats.. 🚀')
                console.log(result);

                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            })
            .catch(error => {
                setnotify('Something Wrong!! 🥺')
                console.log(error);
            });
    };

    const navigateLogin = () => {
        console.log('Successfully redirect Login from...')
        navigate('/login')
    }
    return (
        <div className="container d-flex justify-content-center" style={{height:'100vh'}}>
            <form onSubmit={onSubmitSignupHandler}>
                <h1 className='my-5 d-flex justify-content-center align-items-center'>Singup
                    <span className={`${notify === "Something Wrong!! 🥺" ? 'text-danger' : 'text-success'} fs-4 text mx-3 `}>
                        {notify} </span></h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => { setemail(e.target.value) }}
                        required
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        onChange={(e) => { setpassword(e.target.value) }}
                        required

                    />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Check me out
                    </label>
                </div>
                <button type="submit" className="btn btn-primary  w-25 ">
                    Submit
                </button>
                <p className='text-center redirect'> You have account ,Now <span className='text-success' onClick={navigateLogin}>Login</span></p>

            </form>

        </div>
    )
}

export default Signup


