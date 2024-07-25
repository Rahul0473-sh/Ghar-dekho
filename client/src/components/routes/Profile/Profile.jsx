import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../lib/apiRequest';
import Chat from '../../Chat/Chat';
import List from '../../List/List';
import './profile.scss';
import { Suspense, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { Link } from 'react-router-dom';
function Profile() {
  const navigate = useNavigate();
  const { updateUser, currentUser } = useContext(AuthContext);
  const data = useLoaderData();

  const handleLogout = async() => {
    try {
      await apiRequest.post("/auth/logout")
      updateUser(null);

      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="profile">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Inforamtion</h1>
            <Link to="/profile/update">
              {" "}
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar
              <img src={currentUser.avatar} alt="" />
            </span>

            <span>
              UserName: <b>{currentUser.username}</b>
            </span>

            <span>
              Email:<b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>

          <div className="title">
            <h1>Save List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Profile;