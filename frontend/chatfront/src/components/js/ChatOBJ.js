import React from 'react'
import '../css/chatobj.css'

function ChatOBJ(props) {
  return (
    <div className='chatOBHContainer'>
        <h2>{props.from} </h2>:- <h4>{props.message}</h4>
    </div>
  )
}

export default ChatOBJ;

