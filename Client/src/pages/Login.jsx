import React, { useState, useEffect} from 'react'
import logo from '../assets/images/logotelkom.png'
import PropTypes from 'prop-types';
import './Login.css';


async function loginUser(credentials) {
    return fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

const Login = ({ setToken }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        if("token" in token ){
            setToken(token);

        }
      }
      
    return (
        <div className="row">
            <div className="col-6 bg-hijau">

            </div>
            <div className="col-6">
                <img src={logo} alt="logo tel-u" />
                <div className='login_form'>
      <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      </div>
    </div>

                </div>
            </div>
    )
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }

export default Login