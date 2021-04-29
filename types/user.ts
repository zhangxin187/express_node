enum Role {
  admin,
  normal,
}
// 返回的用户信息
export interface UserData {
  role: Role;
  status: 0 | 1;
  _id: string;
  name: string;
  phone: string;
  createTime?: string;
  password?: string;
}

// 添加用户的字段数据
export interface AddUserData {
  role: Role;
  status: 0 | 1;
  name: string;
  phone: string;
  createTime: string;
  password: string;
}
// 用户文档字段
export interface UserFields {
  role?: Role;
  status?: 0 | 1;
  _id?: string;
  name?: string;
  phone?: string;
  password?:string;
  avatar?:string
}
