import React, { useContext, useEffect } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import instance from '../../../services/axios/axiosDomain/axiosDomain';
import AuthContext from '../../../services/auth/context/AuthContext';

function SignUp() {
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState('password');
    const { token } = useContext(AuthContext);
    const [error, setEroor] = useState({});
    // const [passwordInput, setPasswordInput] = useState("");
    const [value, setValue] = useState({
        first: '',
        last: '',
        email: '',
        user: '',
        password: '',
    });
    useEffect(() => {
        if (token.token) {
            navigate('/');
        }
    }, [token.token, navigate]);
    const checkError = (val) => {
        const error = {};
        if (!val.first) {
            error.first = 'Can not Empty';
        }
        if (!val.last) {
            error.last = 'Can not Empty';
        }
        if (!val.email) {
            error.email = 'Can not Empty';
        }
        if (!val.user) {
            error.user = 'Can not Empty';
        }
        if (val.password.length < 5 || !val.password) {
            error.password = 'Password can not Empty or Password is to short';
        }
        return error;
    };
    const handleSubmit = () => {
        setEroor(checkError(value));
        if (Object.keys(checkError(value)).length === 0) {
            instance
                .post('/users/add', {
                    // email: value.email,
                    // username: value.user,
                    // password: value.password,
                    firstName: value.first,
                    lastName: value.last,
                    age: 250,
                })
                .then((response) => {
                    if (response.status === 200) {
                        alert('create account success');
                        navigate('/signin');
                    }
                })
                .catch((error) => console.log(error));
        }
    };

    // const handlePasswordChange = (evnt) => {
    //   setPasswordInput(evnt.target.value);
    // };
    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
            return;
        }
        setPasswordType('password');
    };
    const handleSignUp = (e) => {
        const name = e.target.name;
        const value1 = e.target.value;
        setValue((prev) => {
            return { ...prev, [name]: value1 };
        });
    };

    return (
        <div>
            <hr></hr>

            <div className="signup__main">
                <img src={require('../../../assets/images/signIn.png')} alt="img_signIn" />
                <div>
                    <div className="signup__title">
                        <h1>Create an account</h1>
                        <span>Enter your details below</span>
                    </div>
                    <div className="signup-input">
                        <div className="signup__form">
                            <div className="signup__name" style={{ width: '100%' }}>
                                <div className="signup__name-check">
                                    <input
                                        type="text"
                                        placeholder="Fisrt Name"
                                        name="first"
                                        onChange={(e) => handleSignUp(e)}
                                    />
                                    <div className="check__error">{error.first}</div>
                                </div>
                                <div className="signup__name-check">
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        name="last"
                                        onChange={(e) => handleSignUp(e)}
                                    />
                                    <div className="check__error">{error.last}</div>
                                </div>
                            </div>
                            <input
                                type="text"
                                placeholder="Email"
                                name="email"
                                onChange={(e) => handleSignUp(e)}
                                autoComplete="email"
                            />
                            {error.email ? (
                                <div style={{ marginTop: '-37px' }} className="check__error">
                                    {error.email}
                                </div>
                            ) : (
                                <></>
                            )}
                            <input type="text" placeholder="Username" name="user" onChange={(e) => handleSignUp(e)} />
                            {error.user ? (
                                <div style={{ marginTop: '-37px' }} className="check__error">
                                    {error.user}
                                </div>
                            ) : (
                                <></>
                            )}
                            <div className="group__pass">
                                <input
                                    type={passwordType}
                                    // onChange={handlePasswordChange}
                                    // value={passwordInput}
                                    name="password"
                                    placeholder="Password"
                                    onChange={(e) => handleSignUp(e)}
                                />
                                <button onClick={togglePassword} className="btn_hide">
                                    {passwordType === 'password' ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                            <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                                            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {error.password ? (
                                <div style={{ marginTop: '-37px' }} className="check__error">
                                    {error.password}
                                </div>
                            ) : (
                                <></>
                            )}

                            <div className="signup__btn">
                                <button className="signup-btnCreate" onClick={handleSubmit}>
                                    {' '}
                                    Create Account
                                </button>
                                <button className="signup-btnCGoogle">
                                    <svg
                                        width="24"
                                        height="25"
                                        viewBox="0 0 24 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_959_3336)">
                                            <path
                                                d="M23.766 12.7764C23.766 11.9607 23.6999 11.1406 23.5588 10.3381H12.24V14.9591H18.7217C18.4528 16.4494 17.5885 17.7678 16.323 18.6056V21.6039H20.19C22.4608 19.5139 23.766 16.4274 23.766 12.7764Z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12.2401 24.5008C15.4766 24.5008 18.2059 23.4382 20.1945 21.6039L16.3276 18.6055C15.2517 19.3375 13.8627 19.752 12.2445 19.752C9.11388 19.752 6.45946 17.6399 5.50705 14.8003H1.5166V17.8912C3.55371 21.9434 7.7029 24.5008 12.2401 24.5008Z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.50253 14.8003C4.99987 13.3099 4.99987 11.6961 5.50253 10.2057V7.11481H1.51649C-0.18551 10.5056 -0.18551 14.5004 1.51649 17.8912L5.50253 14.8003Z"
                                                fill="#FBBC04"
                                            />
                                            <path
                                                d="M12.2401 5.24966C13.9509 5.2232 15.6044 5.86697 16.8434 7.04867L20.2695 3.62262C18.1001 1.5855 15.2208 0.465534 12.2401 0.500809C7.7029 0.500809 3.55371 3.05822 1.5166 7.11481L5.50264 10.2058C6.45064 7.36173 9.10947 5.24966 12.2401 5.24966Z"
                                                fill="#EA4335"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_959_3336">
                                                <rect
                                                    width="24"
                                                    height="24"
                                                    fill="white"
                                                    transform="translate(0 0.5)"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div> Sign up with Google</div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="signup__nextpage">
                        Allready have account? <Link to="/signin"> Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
