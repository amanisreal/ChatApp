import React, { useContext, useEffect, useRef, useState } from 'react'
import NavBar from "./NavBar"
import ChatLeftCard from './ChatLeftCard';
import axios from 'axios';
import '../css/homeChat.css'
import chatContext from '../../context/chatContext';
import ChatOBJ from './ChatOBJ';

function HomeChat() {
  const context = useContext(chatContext)
  const {users, getUsers} = context
  const [update, setUpdate] = useState(true)
  //getAllUserName with the user chats
  useEffect(()=>{
    console.log(localStorage.getItem('token'))
    
    getUsers()
  }, [1])

  

  

  return (
    <div className='homeChatContainer'>
        <div className='homeNav'>
          <NavBar/>
        </div>

        <div className='homeChatBody'>
            <div className='homeBodySide'>
              <div className='sideSearchBox'>
                <input placeholder='Search' className='sideSearhBox' type="text"/>
              </div>

              <div className='usersChatList'>
                <ul className='userChatListUl'>
                  {console.log(users)}
                  {users.map( (u, i) => {
                   console.log(u, i)

                    return <ChatLeftCard key={i} user = {u}/>
                  })}
                </ul>
              </div>
            </div>

           
        </div>
    </div>
  )
}

export default HomeChat