import React, { useState } from 'react'
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth'
import { app } from '../Firebase'
import { useNavigate } from 'react-router-dom'


function LoginPhone() {
    let navigate = useNavigate();
    const [phonenumber, setphonenumber] = useState('');
    const [isotp, setIsotp] = useState(false);
    const [setOTP, setCofirmationOTP] = useState('');


    const onSubmitLoginHandler = (event) => {

        event.preventDefault();
        const auth = getAuth(app);
        const appVerifier = new RecaptchaVerifier(auth, 'recaptchaContainer')
        // const appVerifier = new RecaptchaVerifier(auth, 'recaptchaContainer', { 'size': 'invisible' })
        signInWithPhoneNumber(auth, phonenumber, appVerifier)
            .then((respons) => {
                setIsotp(true)
                setphonenumber('')
                window.confirmationResult = respons
                console.log(respons)

            }).catch((error) => {
                alert("check Something Wrong")
                setphonenumber('')
                console.log(error)
            });
    }
    const submitCofirrmotionOTP = (event) => {
        event.preventDefault();
        window.confirmationResult.confirm(setOTP).then(response => {

            setCofirmationOTP('')
            const TokenManger = response.user.stsTokenManager
            localStorage.setItem('YoutubeToken', TokenManger.accessToken)

            navigate("/main/home")

        }).catch((error) => {
            alert("check Something Wrong")
            console.log(error)
            setCofirmationOTP('')
        });
    }

    return (
        <div className="container d-flex justify-content-center" style={{ height: '100vh' }}>
            {!isotp ? (<form onSubmit={onSubmitLoginHandler}>
                <h1 className='my-5 d-flex justify-content-center align-items-center'> LoginWithOTP </h1>
                <div className="mb-3">
                    <label htmlFor="PhoneNumber" className="form-label">
                        Your Phone Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="PhoneNumber"
                        value={phonenumber}
                        onChange={(e) => { setphonenumber(e.target.value) }}
                        required
                    />
                </div>
                <div className="mb-3" id='recaptchaContainer'></div>
                <button type="submit" className="btn btn-primary   ">
                    Submit
                </button>

            </form>)
                :
                (<form onSubmit={submitCofirrmotionOTP}>
                    <h1 className='my-5 d-flex justify-content-center align-items-center'> Confirmotion OTP

                    </h1>
                    <div className="mb-3">
                        <label htmlFor="confirmationOtp" className="form-label">
                            Wright Your OTP
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="confirmationOtp"
                            value={setOTP}
                            onChange={(e) => { setCofirmationOTP(e.target.value) }}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary  ">
                        Submit
                    </button>
                </form>)
            }

        </div >
    )
}


export default LoginPhone


