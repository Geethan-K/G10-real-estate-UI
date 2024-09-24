
import React, { Suspense, lazy } from 'react';
//const HomePage = lazy(() => import('./routes/homePage/homePage'));
import HomePage from "./routes/homePage/homePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
//const ListPage = lazy(()=>import('./routes/listPage/listPage'))
import ListPage from "./routes/listPage/listPage";
// const Layout = lazy(()=>import('./routes/layout/layout'))
// const RequireAuth = lazy(()=>import('./routes/layout/layout'))
// const SinglePage = lazy(()=>import('./routes/singlePage/singlePage'))
// const ProfilePage = lazy(()=>import('./routes/profilePage/profilePage'))
// const Login = lazy(()=>import('./routes/login/login'))
// const Register = lazy(()=>import('./routes/register/register'))
// const ProfileUpdatePage = lazy(()=>import('./routes/profileUpdatePage/profileUpdatePage'))
// const NewPostPage = lazy(()=>import('./routes/newPostPage/newPostPage'))
// const listPageLoader = lazy(()=>import('./lib/loaders'))
// const profilePageLoader = lazy(()=>import('./lib/loaders'))
// const singlePageLoader = lazy(()=>import('./lib/loaders'))
// const HotelDetailsPage = lazy(()=>import('./routes/hotelDetailsPage/hotelDetailsPage'))
// const store = lazy(()=>import('./redux-store/shared-store'))
// const Provider = lazy(()=>import('react-redux'))

import {Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";

import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";

import HotelDetailsPage from "./routes/hotelDetailsPage/hotelDetailsPage";

import { store } from './redux-store/shared-store'
import { Provider } from 'react-redux';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader:listPageLoader
        },
        {
          path:"/:id",
          element:<SinglePage/>,
          loader:singlePageLoader
        },
        {
          path:"/hotelDetail",
          element:<HotelDetailsPage/>
       //   loader:singlePageLoader
        },
        
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        }
      ]
    },
    {
      path:'/',
      element:<RequireAuth />,
      children:[
        {
          path:"/profile",
          element:<ProfilePage/>,
          loader:profilePageLoader
        },
        {
          path:"/profile/update",
          element:<ProfileUpdatePage />
        },
        {
          path:'/add',
          element:<NewPostPage />
        }
    ]
    }
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  );
}

export default App;
