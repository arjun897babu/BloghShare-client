import './App.css';
import { Routes as AppRoutes, Route } from 'react-router-dom';
import React from 'react';
import ProtectedRoutes from './components/ProtectedRoute';
import { blogSharePath } from './constants/endpoints';

const BlogEditor = React.lazy(() => import('./pages/BlogEditor'))
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogCardList = React.lazy(() => import('./components/BlogCardList'));
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const SignUp = React.lazy(() => import('./pages/SignUp'));

const App = () => {
  return (

    <AppRoutes>
      <Route path={blogSharePath.signup} element={<SignUp />} />
      <Route path={blogSharePath.login} element={<Login />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} >{/* home page */}
          <Route path="" element={<BlogCardList />} /> {/* all blogs */}
          <Route path={blogSharePath.blogEdior} element={<BlogEditor />} /> {/* blog editor */}
          <Route path={blogSharePath.blog} element={<Blog />} /> {/* single blog page */}
          <Route path={blogSharePath.myBlogs} element={<BlogCardList />} /> {/* blog card list for a single user */}
        </Route>
      </Route>
    </AppRoutes>
  );
};

export default App;
