export interface userLoginModel {
  email: string;
  password: string;
}


export interface returnedUserModel {
  data: Data;
  tokenSession: string;
}

export interface Data {
  avatar: string;
  email: string;
  name: string;
  password: string;
}
