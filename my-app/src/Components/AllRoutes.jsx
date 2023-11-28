import React from 'react';
import {Route,Routes} from "react-router-dom";
import LoginPage from '../Pages/LoginPage';
import SignUpPage from '../Pages/SignUpPage';
import HomePage from '../Pages/HomePage';
import SinglePostPage from '../Pages/SinglePostPage';
import PageNotFound from '../Pages/PageNotFound';
import PostPage from '../Pages/PostPage';

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/posts' element={<PostPage/>} />
        <Route path='/singlepage/:id' element={<SinglePostPage/>} />
        <Route path='/userlogin' element={<LoginPage/>} />
        <Route path='/usersignup' element={<SignUpPage/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </div>
  )
}

export default AllRoutes
