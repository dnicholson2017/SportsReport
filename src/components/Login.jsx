import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate ();
    const [credentials, setCredentials] = useState({username:"", password:""})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCredentials( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const callLogin = async () => {
        try {
            const call = await fetch (`http://localhost:5000/${credentials.username}`);
            const response = await call.json();

            console.log(credentials)
            console.log(response)

    
            if ((response.Username === credentials.username) && (response.Password === credentials.password)) {
                // Login successful, navigate to the user's dashboard or perform any other action
                console.log('Login successful:', response);
                navigate(`/${credentials.username}`)
            } else {
                // Invalid username or password
                console.log('Invalid username or password');
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
        }
    };

    
    const callSignup = () => {
    console.log('call sign up function called');
    }

    return (

        <div>
            <h1>Login</h1>
            <form className='login-form'>

                <label>Username</label>
                <input type='text' id='username' name='username' onChange={handleChange}/><br/>
                <br/>

                <label>Password</label>
                <input type='text' id='password' name='password' onChange={handleChange}/><br/>
                <br/>

                {/* By default, when you click a button inside a form without specifying a type attribute,
                 the button behaves like a submit button. When you click it, the form is submitted, 
                 causing a reload or a change in the URL. */}

                <button type="button" onClick={callLogin}>Login</button>
                <Link to={'/sign-up'}>
                    <button type="button" onClick={callSignup}>Sign-Up</button>
                </Link>

                {/* <input type="submit" value="Submit" onClick={callLogin} /> */}

            </form>
        </div>
      )
}

export default Login;