export interface IAuth {
  status: number;
  userId: string
  token: string;
  refreshToken: string
}

export interface ILogin {
  email: string;
  password: string;  
}

export interface IRegistration {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  password: string;
}

export interface IUpdateUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface IChangePass {
  password: string;  
  new_password: string;  
}

export interface IUser {
  _id: string
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  photo?: string;
}

export interface IPost {
  _id?: string
  title: string;
  content: string;
  userId: string;
  authorName: string;
  likes?: number;
  likesUsers?: string[];
  date: string;
}

export interface IComment {
  _id: string
  text: string;
  articleId: string;
  userId: string;
  date: string;
}

export interface IRefreshTokenResponse {
  status: number;
  userId: string;
  token: string;
  refreshToken: string;
}

export interface IFriendsResp {
  status: number;
  message: string;
  data?: IFriends;
}

export interface IFriends {
  _id: string;
  userId: string;
  acceptedFriends: string[];
  requestedFriends: string[];
}