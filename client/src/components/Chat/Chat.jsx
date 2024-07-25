import { useEffect, useState } from 'react';
import './chat.scss';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { apiRequest } from '../../lib/apiRequest';
import {format} from "timeago.js"
function Chat({ chats }) {
  const {currentUser}=useContext(AuthContext)
  const [chat, setChat] = useState(null);

  const handleOpenChat = async (id, reciver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      console.log(res);
      setChat({ ...res.data, reciver });

    } catch (error) {
      console.log(error.message);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData(e.target);
      const text = formdata.get("text");
      if (!text) return;
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      console.log(res);
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }))
      e.target.reset();
    } catch (error) {
      
    }
  }
  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats.map((c) => (
          <div className="message" key={c.id}
            style={{
            backgroundColor:c.seenBy.includes(currentUser.id)?"white":"#fecd514e"
            }}
            onClick={()=>handleOpenChat(c.id,c.reciver)}
          >
          <img
            src={c.reciver.avatar || "noavatar.jpg"}
            alt=""
          />
            <span>{ c.reciver.username}</span>
            <p>{ c.lastMessage}</p>
        </div>
      ))}
      </div>
     {chat &&  <div className="chatBox">
        <div className="top">
          <div className="user">
            <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            Rahul Sharma
          </div>
          <span onClick={()=>setChat(null)}>X</span>
        </div>
        <div className="center">
         
          {chat.messages.map((message) => {

            return <div className="chatMessage"
              style={{
                alignSelf: message.userId === currentUser.id ?"flex-end":"flex-start",
                textAlign: message.userId=== currentUser.id ?"flex-end":"flex-start"
              }}
              key={message.id}> 
            <p>{ message.text} </p>
            <span>{ format(message.createdAt)}</span>
          </div>
         })};

         
        </div>
        <form onSubmit={handleSubmit} className="bottom">
          <textarea name='text'></textarea>
          <button>Send Message</button>
        </form>
      </div>}
    </div>
  );
}

export default Chat;