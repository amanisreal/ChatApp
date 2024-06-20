import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../css/signUp.css'

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setnName] = useState('');

    const navigate = useNavigate();
    
    const onNameChange = (e) => {
        setnName(e.target.value)
    }
    
    const onEmailChange = (e) => {
        setEmail(e.target.value)}

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }


    //on form submission
    const signUpFormSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, password);

        axios({
            url: 'http://localhost:3001/user',
            method: 'POST',
            data: {
                email: email,
                password: password,
                name: name
            }
        }).then((response) => {
            // console.log(response.data);
            if(response.status === 201){
                localStorage.setItem('token', response.data.token);
                navigate('/')
            }
        }).catch(function(error){
            console.log(error);
            alert('user Aready exists')
          })
    }

  return (
    <div className='signUpContainer'>
        <form className='loginForm' onSubmit={signUpFormSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
                <input value ={name} onChange={onNameChange} placeholder='aman_-' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input value ={email} onChange={onEmailChange} placeholder='example@gmail.com' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input value ={password} onChange={onPasswordChange} placeholder='******' type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            
            <button type="submit" className="btn btn-primary">SignUp</button>
        </form>

        <p>Already a user? <Link to="/login">Login</Link></p>

    </div>
  )
}

export default SignUp