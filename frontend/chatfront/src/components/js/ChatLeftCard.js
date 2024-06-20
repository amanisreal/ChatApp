import React, { useContext } from 'react'
import "../css/chatleftcard.css"
import ChatOBJ from './ChatOBJ';
import chatContext from '../../context/chatContext'

function ChatLeftCard(props) {
  const context = useContext(chatContext)
  const {user} = props;

  const onHandleClick = (e) => {
    const here = document.querySelector('.homeBodyMain');
    here.style.opacity = 1;
    //render particular chats
    // setDisplayUser(user);
    console.log(user)
  }

  return (
    <div className='forFlexChatLeft'>
    <div className='chatLeftContainer' onClick={onHandleClick}>
    
        <div className='imgOfItherUser'>
          <img className='imgOfOT' src={props.url}/>
        </div>

        <div className='nameOfOtheruser'>
          {user?.to}
        </div>
    </div>
    
    <div className='homeBodyMain'>
              <div className='seeChats'>
                {/* render msgs */}\
                {console.log(user)}
                {user?.chats?.map((msgs) => {
                  return <ChatOBJ from={msgs?.from} message = {msgs?.chat}/>
                })}
              </div>

              <div className='footer'>
                <input className='commonFooter1' placeholder='type your msg here' type="text"/>
                <button className='commonFooter2'>Location</button>
                <button className='commonFooter2'>Send</button>
              </div>
            </div>
    
    </div>
  )
}

export default ChatLeftCard