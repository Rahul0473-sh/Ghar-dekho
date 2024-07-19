import { useContext, useState } from 'react';
import {useNavigate} from "react-router-dom"
import { apiRequest } from '../../../lib/apiRequest';
import './updatePage.scss';
import { AuthContext } from '../../../Context/AuthContext';
import UploadWidget from '../../uploadWidget/uploadWidget';

function ProfileUpdatePage() {
  const [err, setErr] = useState("");
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      const formdata = new FormData(e.target);
      const { username, email, password } = Object.fromEntries(formdata); 
      console.log("hey");
      
      const res = await apiRequest.put(`/user/updateuser/${currentUser.id}`,
        {
          username,
          email,
          password,
          avatar:avatar[0],
        }
      );
      updateUser(res.data);
      navigate("/profile");

      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {err && <span>{err}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" />
        <UploadWidget
          uwConfig={{
            cloudName: "daws9oowf",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;