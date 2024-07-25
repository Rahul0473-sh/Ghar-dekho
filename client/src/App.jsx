
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
import { ListPageLaoder, SinglePageLaoder,profilePageLoader } from './lib/loader.js'


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
          loader:ListPageLaoder
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader:SinglePageLaoder,
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
          element: <Profile />,
          loader:profilePageLoader,

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
