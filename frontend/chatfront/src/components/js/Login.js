import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../css/login.css'


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  const whenOnSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    // const response =  fetch('http://localhost:3001/user/login', {
     
    //   method: 'POST',
    //   header:{
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({email: email, password: password})
    // })
    // console.log(response)
    //const json = await response.json();
    //console.log(json)

    //check why not working with fetch

    //with axios
    axios({
      url:"http://localhost:3001/user/login",
      method: "POST",
      data:{
        email: email,
        password: password
      }
    }).then(function(response){
      if(response.status === 200){
        localStorage.setItem('token', response.data.token);
        navigate('/')
      }
    })
  }

  const onEmmailChange = (e) => {
    setEmail(e.target.value)
  } 

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  } 

  return (
    <div className='loginContainer'>
        <form className='loginForm' onSubmit={whenOnSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input value={email} onChange={onEmmailChange} placeholder='example@gmail.com' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input value={password} onChange={onPasswordChange}  placeholder='******' type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            
            <button type="submit" className="btn btn-primary">Login</button>
        </form>

        <p>New to SocioApp? <Link to="/signUp">Sign Up</Link></p>
    </div>
  )
}

export default Login