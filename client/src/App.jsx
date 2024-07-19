
import Homepage from './components/routes/Hompage/Homepage.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout, { RequireAuth } from './components/routes/Layout/Layout.jsx'
import ListPage from './components/routes/Listpage/ListPage.jsx'
import SinglePage from './components/routes/singlePage/SinglePage.jsx'
import Profile from './components/routes/Profile/Profile.jsx'
import Register from './components/routes/register/Register.jsx'
import Login from './components/routes/Login/Login.jsx'
import ProfileUpdatePage from './components/routes/profileUpdatePage/ProfileUpdatePage.jsx'
import NewPostPage from './components/routes/newPostPage/newPostPage.jsx'


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/list",
          element: <ListPage />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <Profile />

        },
        {
          path: "/profile/update",
          element:<ProfileUpdatePage/>
        },
        {
          path: "/add",
          element:<NewPostPage/>
        }
      ],
    },
  ]);

  return (
    <RouterProvider router={router}/>
  );
}

export default App
