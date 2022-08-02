import React from 'react'
import logo from '../assets/images/logotelkom.png'

const Login = () => {
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

                </div>
            </div>
        </div>
    )
}

export default Login