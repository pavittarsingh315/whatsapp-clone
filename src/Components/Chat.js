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
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';


function Chat() {
    const [message, setMessage] = useState('');
    const { chatId } = useParams();
    const [chatName, setChatName] = useState('');
    const [texts, setTexts] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if(chatId) {
            db.collection('chats').doc(chatId).onSnapshot(snapshot => (
                setChatName(snapshot.data().name)
            ))

            db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setTexts(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [chatId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('chats').doc(chatId).collection('messages').add({
            message: message,
            name: user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
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
                {texts.map(text => (
                    <p className={`chat__message ${text.name === user.displayName && "chat__receiver"}`}>
                        <span className="chat__name">{text.name}</span>
                        {text.message}
                        <span className="chat__timestamp">
                            {/* this formats the json date to a nice date. ? is safety for when the timestamp hasnt yet loaded */}
                            {new Date(text.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
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
