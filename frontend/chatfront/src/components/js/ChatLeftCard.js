import React, { useContext, useState } from 'react'
import "../css/chatleftcard.css"
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';


function ChatLeftCard(props) {
  const [currUser, setCuUser] = useState({})
  console.log(props)
  {setCuUser(props)}
  return (
    <div className='chatLeftContainer'>
    
        <div className='imgOfItherUser'>
          <img className='imgOfOT' src={props.url}/>
        </div>

        <div className='nameOfOtheruser'>
          {console.log(props)}
          <Link to='/chat/chatings' state={currUser}>{props?.user?.chats[0]?.to}</Link>
        </div>
    </div>
  )
}



export default ChatLeftCard;

/*
 <div className='homeBodyMain'>
              <div className='seeChats'>
                
                </div>

                <div className='footer'>
                  <input className='commonFooter1' placeholder='type your msg here' type="text"/>
                  <button className='commonFooter2'>Location</button>
                  <button className='commonFooter2'>Send</button>
                </div>
              </div>
              
              
              */