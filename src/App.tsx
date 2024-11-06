import { Route, Routes } from "react-router-dom";
import MainContainer from "./components/MainContainer/MainContainer";
import Home from "./pages/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect, useState } from "react";
import NotFound from "./pages/NotFound/NotFound";
import Users from "./pages/Users/Users";
import Profile from "./pages/Profile/Profile";
import Posts from "./pages/Posts/Posts";
import UserSettings from "./pages/UserSettings/UserSettings";
import User from "./pages/User/User";
import checkTokenExpiration from "./helpers/checkTokenExp";
import { useRefreshTokenMutation } from "./redux/authApi";
import { checkUser } from "./redux/authSlice";
import Spinner from "./components/UI/Spinner/Spinner";
import AuthComponent from "./helpers/AuthComponent";
import Messages from "./pages/Messages/Messages";
import Friends from "./pages/Friends/Friends";


function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [refreshToken, { data, isSuccess, isError, error }] = useRefreshTokenMutation();

  useEffect(() => {
    dispatch(checkUser());

    if (auth.token) {
      const check = checkTokenExpiration(auth.token);
      if (!check) {
        refreshToken({ refreshToken: auth.refreshToken! });
      } else {
      }
    }
  }, [auth])

  useEffect(() => {
    if (isSuccess) {
      const userStorage = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (userStorage) {
        const parsedUser = JSON.parse(userStorage);
        const rememberMe = parsedUser.rememberMe;

        const updatedUserData = {
          ...parsedUser,
          token: data.token,
          refreshToken: data.refreshToken,
        };

        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(updatedUserData));
          dispatch(checkUser());
        } else {
          sessionStorage.setItem('user', JSON.stringify(updatedUserData));
          dispatch(checkUser());
        }
      }
    }
  }, [isSuccess, isError])

  return (
    <>
      <Routes>
        <Route path="/" element={<MainContainer />}>
          <Route index element={<Home />} />
          <Route path="users" element={
            <AuthComponent token={auth.token}>
              <Users />
            </AuthComponent>}
          />
          <Route path="users/:userId" element={
            <AuthComponent token={auth.token}>
              <User />
            </AuthComponent>}
          />
          <Route path="profile" element={
            <AuthComponent token={auth.token}>
              <Profile />
            </AuthComponent>}
          />
          <Route path="friends" element={
            <AuthComponent token={auth.token}>
              <Friends />
            </AuthComponent>}
          />
          <Route path="settings" element={
            <AuthComponent token={auth.token}>
              <UserSettings />
            </AuthComponent>}
          />
          <Route path="posts" element={
            <AuthComponent token={auth.token}>
              <Posts />
            </AuthComponent>}
          />
          <Route path="messages" element={
            <AuthComponent token={auth.token}>
              <Messages />
            </AuthComponent>}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
