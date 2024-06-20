import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import chatContext from '../../context/chatContext';
import '../css/navbar.css'

function NavBar() {
  const context = useContext(chatContext)
  const {currUser, getCurrUser} = context

  useEffect(() => {
    getCurrUser()
  }, [])
  return (
    <div className='navbarContainer'>
      <ul className='commonLi navbarUl'>
        <li className='commonLi chatAppLi'>Chat App</li>
        <li className='commonLi inputLi'><input className='userSearchInput' type="text"/></li>
        <li className='commonLi searchLi'>Search</li>
        <li className='commonLi searchLi'><Link to="/createPost">CreatePost</Link></li>
        <li className='commonLi searchLi'><Link to="/chat">Chat</Link></li>
        <li className='commonLi userLi'><Link to={currUser? '/' : '/login'}>{currUser? currUser.name: 'User'}</Link></li>
      </ul>
    </div>
  )
}

export default NavBar