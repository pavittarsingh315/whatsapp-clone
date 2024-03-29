import React, { useEffect, useState } from 'react';
import '../Css/Sidebar.css';
import SidebarChat from './SidebarChat'
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import db from '../firebase';
import { useStateValue } from '../StateProvider';


function Sidebar() {

    const [chats, setChats] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => 
                ({
                    id: doc.id,
                    data: doc.data()
                })
            ))
        ))
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                {/* the ? in user?.photoURL is a safety check for when the image hasnt yet been loaded so it uses the default avatar pic */}
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {chats.map(chat => (
                    <SidebarChat 
                        key={chat.id}
                        id={chat.id}
                        name={chat.data.name}
                    />
                ))}
            </div>
        </div>
    )
}

export default Sidebar;
