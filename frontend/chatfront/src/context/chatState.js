import axios from 'axios';
import chatContext from './chatContext'
import { useState } from "react";

const ChatState = (props) => {
    const url = "http://localhost:3001";
    
    const [users, setUsers] = useState([]);
    const [displayuser, setDisplayUser] = useState([])

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
        <chatContext.Provider value={{users, getUsers, displayuser}}>
            {props.children}
        </chatContext.Provider>
    )
}

export default ChatState;