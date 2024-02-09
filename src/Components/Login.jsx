import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import { app } from '../Firebase'
import { useNavigate } from 'react-router-dom'


function Login() {
    let navigate = useNavigate();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [notify, setnotify] = useState('');


    const onSubmitLoginHandler = (event) => {
        event.preventDefault();
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then(userData => {
                const TokenManger = userData.user.stsTokenManager

                localStorage.setItem('YoutubeToken', TokenManger.accessToken)
                setnotify('Welcome..!🚀🚀')
                setTimeout(() => {
                    navigate('/main/home');
                }, 1000);
            })
            .catch(error => {
                setemail();
                setpassword();
                setnotify('Something Wrong!! 🥺')
                console.log(error);
            });
    };
    const loginWithGoogle = () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
            .then(userData => {
                const TokenManger = userData.user.stsTokenManager
                localStorage.setItem('YoutubeToken', TokenManger.accessToken)


                setnotify('Welcome..!🚀🚀')
                setTimeout(() => {
                    navigate('/main/home');
                }, 1000);
            })
            .catch(error => {
                setnotify('Something Wrong!! 🥺')
                console.log(error);
            });


    }
    const loginWithGithub = () => {
        const auth = getAuth(app);
        const provider = new GithubAuthProvider()

        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
                const TokenManger = result.user.stsTokenManager

                localStorage.setItem('YoutubeToken', TokenManger.accessToken)


                setnotify('Welcome..!🚀🚀')
                setTimeout(() => {
                    navigate('/main/home');
                }, 1000);
            })
            .catch(error => {
                setnotify('Something Wrong!! 🥺')
                console.log(error);
            });


    }
    const LoginWithOtp = () => {
        console.log("login with Otp..")
        navigate('/loginOTP')
    }

    const navigateSignup = () => {
        navigate('/signup')
    }


    return (
        <div className="container d-flex justify-content-center">
            <form onSubmit={onSubmitLoginHandler}>
                <h1 className='my-5 d-flex justify-content-center align-items-center'> Login
                    <span className={`${notify === "Something Wrong!! 🥺" ? 'text-danger' : 'text-success'} fs-4 text mx-3 `}>
                        {notify}
                    </span>
                </h1>
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
                <p className='text-center redirect'>Don't have an account? <span className='text-success' onClick={navigateSignup}>Sign up</span></p>

                <p className='d-flex justify-content-center align-items-center'>OR</p>
                <hr />

                {/* Google  Login Btn*/}
                <button
                    type="button"
                    className="btn  btn-sm btn-light w-100  my-3"
                    onClick={loginWithGoogle}
                >
                    <img width="28" height="28" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
                    &nbsp; &nbsp; Login with Google
                </button>

                {/* Github  Login Btn*/}
                <button
                    type="button"
                    className="btn btn-sm btn-light w-100  my-3"
                    onClick={loginWithGithub}
                >
                    <img width="28" height="28" src="https://img.icons8.com/ios-filled/50/github.png" alt="google-logo" />
                    &nbsp; &nbsp; Login with Github
                </button>

                {/* OTP  Login Btn*/}
                <button
                    type="button"
                    className="btn btn-sm btn-light w-100  my-3"
                    onClick={LoginWithOtp}
                >
                    <img width="28" height="28" src="https://img.icons8.com/ios-filled/50/iphone14-pro.png" alt="google-logo" />
                    &nbsp; &nbsp; Login with OTP
                </button>
            </form>

        </div>
    )
}

export default Login


