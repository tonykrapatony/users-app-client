import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import checkTokenExpiration from '../helpers/checkTokenExp';

interface AuthState {
  isAuth: boolean;
  userId?: string;
  token?: string;
  refreshToken?: string;
  rememberMe: boolean;
}

interface AuthPayload {
  token?: string;
  refreshToken?: string;
  userId?: string;
}

const initialState: AuthState = {
  isAuth: false,
  userId: '',
  token: '',
  refreshToken: '',
  rememberMe: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthPayload>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.userId;

      const userData = {
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        userId: action.payload.userId,
        rememberMe: state.rememberMe,
      };

      if (state.rememberMe) {
        localStorage.setItem(
          'user',
          JSON.stringify(userData),
        );
      } else {
        sessionStorage.setItem(
          'user',
          JSON.stringify(userData),
        );
      }
      state.isAuth = true;
    },
    
    checkUser: (state) => {
      const userStorage = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (!userStorage) {
        state.isAuth = false;
        state.token = '';
        state.refreshToken = '';
        state.userId = '';
        return;
      }
      const parsedUser = JSON.parse(userStorage);

      state.isAuth = true;
      state.token = parsedUser.token;
      state.refreshToken = parsedUser.refreshToken;
      state.userId = parsedUser.userId;
      state.rememberMe = parsedUser.rememberMe;
    },

    logout: (state) => {
      if (localStorage.getItem('user')) {
        localStorage.removeItem('user');
      } else {
        sessionStorage.removeItem('user');
      }
      state.isAuth = false;
      state.token = '';
      state.refreshToken = '';
      state.userId = '';
    }, 

    toggleRememberMe: (state) => {
      state.rememberMe = !state.rememberMe;
    },
  }
})

export const { setUser, checkUser, toggleRememberMe, logout } = authSlice.actions

export default authSlice.reducer