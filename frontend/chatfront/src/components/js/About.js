import React, {useContext, useEffect} from 'react'
import '../css/about.css'
import chatContext from '../../context/chatContext';
import imgURLs from "../images/download.png"

function About(props) {
  const context = useContext(chatContext)
  const {currUser, getCurrUser} = context

  useEffect(() => {
    getCurrUser()
  }, [])
  return (
    <div className='aboutContainer'>
      <div className='aboutImage'>
        <img src={imgURLs}/>
      </div>

      <div className='aboutDetail'>
        <p>{currUser.name}</p>
        <p>{currUser.email}</p>
      </div>
    </div>
  )
}

export default About