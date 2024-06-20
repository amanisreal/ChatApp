import axios from 'axios';
import chatContext from './chatContext'
import { useState } from "react";

const ChatState = (props) => {
    const url = "http://localhost:3001";
    
    const [users, setUsers] = useState([]);
    const [displayuser, setDisplayUser] = useState([])
    const [currUser, setCurrUsre] = useState('');

    //get the currentUse
    const getCurrUser = async () => {
        axios({
            url:`${url}/user/me`,
            method: "GET",
            headers:{
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function(response){
            console.log(response.data)
            if(response.status === 200){
              setCurrUsre(response.data)
            }
          })
    }

    //get all the users
    const getUsers = async () => {
        console.log(localStorage.getItem('token'))
        axios({
        url: `${url}/chats`,
        method: "GET",
        headers:{
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
        }).then(function(response){
            console.log(response.data)
            if(response.status === 200){
              setUsers(response.data)
            }
          })
    }

    return(
        <chatContext.Provider value={{users, getUsers, displayuser, currUser, getCurrUser}}>
            {props.children}
        </chatContext.Provider>
    )
}

export default ChatState;