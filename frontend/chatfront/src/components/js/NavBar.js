import React from 'react'
import { Link } from 'react-router-dom'
import '../css/navbar.css'

function NavBar() {
  return (
    <div className='navbarContainer'>
      <ul className='commonLi navbarUl'>
        <li className='commonLi chatAppLi'>Chat App</li>
        <li className='commonLi inputLi'><input className='userSearchInput' type="text"/></li>
        <li className='commonLi searchLi'>Search</li>
        <li className='commonLi searchLi'><Link to="/chat">Chat</Link></li>
        <li className='commonLi userLi'>User</li>
      </ul>
    </div>
  )
}

export default NavBar