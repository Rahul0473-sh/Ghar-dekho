import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../lib/apiRequest';
import Chat from '../../Chat/Chat';
import List from '../../List/List';
import './profile.scss';

function Profile() {
  const navigate = useNavigate();
  const handleLogout = async() => {
    try {
      await apiRequest.post("/auth/logout")
      localStorage.removeItem("user");
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
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </span>

            <span>
              UserName: <b>Rahul</b>
            </span>

            <span>
              Email:<b>rs3253900@gmail.com</b>
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