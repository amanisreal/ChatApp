import logo from './logo.svg';
import './App.css';
import Login from './components/js/Login';
import HomeChat from "./components/js/HomeChat";
import Home from "./components/js/Home"
import SignUp from './components/js/SignUp';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomeDisplayCard from './components/js/HomeDisplayCard';
import Createpost from './components/js/createPost';
import ChatState from './context/chatState';
import Chatings from './components/js/Chatings';

const router = createBrowserRouter([
  {
    path:'/signUp',
    element: <SignUp/>
  },

  {
    path: '/login',
    element: <Login/>
  },

  {
    path: '/',
    element: <Home/>
  },

  {
    path: '/createPost',
    element: <Createpost/>
  },

  {
    path: '/chat',
    element: <HomeChat/>
  },

  {
    path: '/chat/chatings',
    element: <Chatings/>
  }

])

function App() {
  return (
    <>
      <ChatState>
      <RouterProvider router={router}/>
      </ChatState>
    </>
  );
}

export default App;
