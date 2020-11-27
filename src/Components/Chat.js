import React, { useState, useEffect } from 'react';
import '../Css/Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import { useParams } from 'react-router-dom';
import db from '../firebase';


function Chat() {
    const [message, setMessage] = useState('');
    const { chatId } = useParams();
    const [chatName, setChatName] = useState('');

    useEffect(() => {
        if(chatId) {
            db.collection('chats').doc(chatId).onSnapshot(snapshot => (
                setChatName(snapshot.data().name)
            ))
        }
    }, [chatId])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(message)
        setMessage('');
    }

    return (
        <div className="chat">

            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{chatName}</h3>
                    <p>Last Seen at...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                <p className={`chat__message ${true && 'chat__receiver'}`}>
                    <span className="chat__name">Pavittar</span>
                    Hello
                    <span className="chat__timestamp">4:20pm</span>
                </p>
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send</button>
                </form>
                <MicIcon />
            </div>

        </div>
    )
}

export default Chat;
