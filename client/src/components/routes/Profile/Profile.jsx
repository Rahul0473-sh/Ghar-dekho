import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../lib/apiRequest';
import Chat from '../../Chat/Chat';
import List from '../../List/List';
import './profile.scss';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { Link } from 'react-router-dom';
function Profile() {
  const navigate = useNavigate();
  const {updateUser,currentUser} = useContext(AuthContext);

  const handleLogout = async() => {
    try {
      console.log("hey");
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
          <Link to="/profile/update"> <button>Update Profile</button></Link> 
          </div>
          <div className="info">
            <span>
              Avatar
              <img
                src={currentUser.avatar}
                alt=""
              />
            </span>

            <span>
              UserName: <b>{ currentUser.username}</b>
            </span>

            <span>
              Email:<b>{ currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Save List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default Profile;