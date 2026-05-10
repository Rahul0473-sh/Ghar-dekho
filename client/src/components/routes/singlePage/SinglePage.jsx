import { useContext, useEffect, useRef, useState } from "react";
import Slider from "../../Slider/Slider";
import "./singlepage.scss";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPURIFY from "dompurify";
import { AuthContext } from "../../../Context/AuthContext";
import { SocketContext } from "../../../Context/socketContext";
import { apiRequest } from "../../../lib/apiRequest";
import { format } from "timeago.js";

function SinglePage() {
  const post = useLoaderData();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const [saved, setSaved] = useState(post.isSaved);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const messageEndRef = useRef();

  // scroll to bottom whenever messages update
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // listen for incoming messages on the open chat
  useEffect(() => {
    if (!socket || !chat) return;

    const handleIncoming = (data) => {
      if (data.chatId === chat.id) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("getMessage", handleIncoming);
    return () => socket.off("getMessage", handleIncoming);
  }, [socket, chat]);

  const handleSendMessage = async () => {
    if (!currentUser) return navigate("/login");
    if (!post.user?.id) return alert("Cannot message the owner of this listing.");

    try {
      setChatLoading(true);
      const chatRes = await apiRequest.post("/chats/addChat", { reciverId: post.user.id });
      // fetch existing messages for that chat
      const msgRes = await apiRequest.get("/chats/" + chatRes.data.id);
      setChat(chatRes.data);
      setMessages(msgRes.data.messages || []);
    } catch (err) {
      console.log(err);
    } finally {
      setChatLoading(false);
    }
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    const text = e.target.text.value.trim();
    if (!text) return;

    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setMessages((prev) => [...prev, res.data]);
      e.target.reset();
      socket?.emit("sendMessage", {
        receiverId: post.user.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    if (!currentUser) navigate("/login");
    try {
      setSaved((prev) => !prev);
      await apiRequest.post("/user/save", { postId: post.id });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPURIFY.sanitize(post.postDetail.desc),
              }}
            />
          </div>
        </div>
      </div>

      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>

          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom}</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom}</span>
            </div>
          </div>

          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>

          <p className="title">Location</p>
          <div className="buttons">
            <button
              onClick={handleSendMessage}
              disabled={chatLoading || !post.user?.id || currentUser?.id === post.user?.id}
            >
              <img src="/chat.png" alt="" />
              {chatLoading ? "Opening..." : "Send a Message"}
            </button>
            <button
              onClick={handleSave}
              style={{ backgroundColor: saved ? "#fece51" : "white" }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>

          {/* Inline chat panel */}
          {chat && (
            <div className="chatPanel">
              <div className="chatPanelHeader">
                <div className="chatPanelUser">
                  <img src={post.user.avatar || "/noavatar.jpg"} alt="" />
                  <span>{post.user.username}</span>
                </div>
                <button className="closeChat" onClick={() => setChat(null)}>✕</button>
              </div>

              <div className="chatPanelMessages">
                {messages.length === 0 && (
                  <p className="noMessages">No messages yet. Say hello!</p>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`chatMsg ${msg.userId === currentUser?.id ? "own" : "other"}`}
                  >
                    <p>{msg.text}</p>
                    <span>{format(msg.createdAt)}</span>
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>

              <form className="chatPanelForm" onSubmit={handleSubmitMessage}>
                <input name="text" placeholder="Type a message..." autoComplete="off" />
                <button type="submit">Send</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
