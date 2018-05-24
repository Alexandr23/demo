export interface ITodo {
  id: number;
  title: string;
  time: string;
  bg: string;
}

export interface ITodoState {
  list: ITodo[];
  error: any;
  isRequesting: false;
  isRequested: false;
}