export interface IUser {
  login: string;
  password: string;
}

export interface IUserState {
  user: IUser;
  error: any;
  isRequesting: false;
  isRequested: false;
}