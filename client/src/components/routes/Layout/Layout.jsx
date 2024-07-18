import './layout.scss';
import { Outlet, useNavigate,Navigate } from "react-router-dom"
import { Navbar } from '../../Navbar/Navbar';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';

function Layout() {
   return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
export function RequireAuth() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!currentUser) return <Navigate to="/login"/>
  else {
    return (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
}
export default Layout;
