import React from 'react'
import NavBar from "./NavBar"
import HomeDisplayCard from './HomeDisplayCard'
import '../css/home.css';

function Home(props) {

  //get all updates
  const getUpdates = async () => {
    
  }


  return (
    <div className='homeContainerForNavBar'>
      <div className='navBarContainer'>
      <NavBar/>
      </div>
      <div className='homeContainer'>
      
       <div className='postsContainer'>
        {/* Fetch all the post here irrespective of friends */}
        {/* props.posts.filter((post) => {
          return <HomeDisplayCard/>
        }) */}
        <HomeDisplayCard />
        <HomeDisplayCard/>
        <HomeDisplayCard/>
        <HomeDisplayCard/>
        <HomeDisplayCard/>
       </div>

       <div className='aboutContainer'>
abour
       </div>
    </div>
    </div>
  )
}

export default Home