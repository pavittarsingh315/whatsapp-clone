import React, { useEffect, useState } from 'react';
import '../Css/SidebarChat.css';
import { Avatar } from '@material-ui/core';

import db from '../firebase';
import { Link } from 'react-router-dom';


function SidebarChat({ id, name, addNewChat }) {

    const [lastMessage, setLastMessage] = useState('');

    useEffect(() => {
        if(id) {
            db.collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
                setLastMessage(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [id])

    const createChat = () => {
        const chatName = prompt("Enter a chat name");

        if (chatName) {
            // if room name is given then do this in firbase
            db.collection('chats').add({
                name: chatName
            })
        }
    }; 

    // ternary operator says if addNewChat isn't true then render normal chats else display "Add New Chat" div
    return !addNewChat ? (
        <Link to={id}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{lastMessage[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    );
}

export default SidebarChat;
