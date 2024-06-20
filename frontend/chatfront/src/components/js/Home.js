import React, {useContext, useEffect} from 'react'
import NavBar from "./NavBar"
import HomeDisplayCard from './HomeDisplayCard'
import '../css/home.css';
import About from './About';
import chatContext from '../../context/chatContext';

function Home(props) {
  const context = useContext(chatContext)
  const {posts, getAllPost} = context

  //get all updates
  useEffect(() => {
    getAllPost();
  }, [])


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
        {posts.map((post) => {
          console.log(post)
          return <HomeDisplayCard />
        })}
       </div>

       <div className='aboutContainer'>
          <About/>
       </div>
    </div>
    </div>
  )
}

export default Home