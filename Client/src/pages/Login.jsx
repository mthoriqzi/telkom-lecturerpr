import React, { useState, useEffect} from 'react'
import logo from '../assets/images/logotelkom.png'
import PropTypes from 'prop-types';


async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
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
        setToken(token);
      }
    return (
        <div className="row">
            <div className="col-6 bg-hijau">
                <h1>DEK-FRI</h1>
                <h4>DASHBOARD EVALUASI KINERJA</h4>
                <h4>FAKULTAS REKAYASA INDUSTRI</h4>
            </div>
            <div className="col-6">
                <img src={logo} alt="logo tel-u" />
                <div className='login_form'>
        
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
    )
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }

export default Login