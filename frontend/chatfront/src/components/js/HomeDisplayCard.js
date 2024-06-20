import React from 'react'
import '../css/homedisplayCard.css'
// import userLogo from '../images/download (2).jpg'

function HomeDisplayCard(props) {
  return (
    <div className='homeDisplayCardContainer'>
        <div className='homeDisplayCardHeader'>
            <img className='userImage' src={props.userLogo}/>

            <p>{props.userName}</p>
        </div>

        <div className='homeDisplayCardBody'>
            <img id='bodyImageByUser' src={props.ImageURL}/>

        </div>

        <div className='homeDisplayCardFooter'>
            <ul className='cardLikeAndComment'>
                <li className='commonLIOfCardFooter'>Like</li>
                <li className='commonLIOfCardFooter'>Comment</li>
            </ul>

            <p>{props.caption}</p>
        </div>
    </div>
  )
}

export default HomeDisplayCard