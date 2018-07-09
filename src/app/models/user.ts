export interface IUser {
  username: string;
  password: string;
}

export interface IUserState {
  user: IUser;
  error: any;
  isRequesting: false;
  isRequested: false;
}