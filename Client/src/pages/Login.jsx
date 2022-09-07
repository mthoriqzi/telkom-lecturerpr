import React, { useState } from 'react'
import logo from '../assets/images/logotelkom.png'
import PropTypes from 'prop-types';
import './Login.css';


async function loginUser(credentials) {
    return fetch('http://34.101.42.148:3001/login', {
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
      <div className="row vh-100 m-0">
        <div className="col-6 bg-hijau my-auto h-100 d-flex align-items-center justify-content-center text-center text-white">
          <div>
            <h1 className='big'>DEK-FRI</h1>
            <h3>Dashboard Evaluasi Kinerja</h3>
            <h3>Fakultas Rekayasa Industri</h3>
          </div>
        </div>
        <div className="col-6 row">
          <div className="col-9"></div>
          <div className="col-3">
            <img src={logo} alt="logo tel-u" className="logo mt-5"/> 
          </div>
          <div>
            <div className="login-wrapper">
              <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                  <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                  </label>
                  <br/><br/>
                  <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                  </label>
                  <div>
                  <br/>
                    <button type="submit" className='btn btn-success'>Log In</button>
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