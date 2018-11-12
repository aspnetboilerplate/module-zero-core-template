export interface CreateUserOutputItem {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  fullName: string;
  lastLoginTime?: any;
  creationTime: Date;
  roleNames: string[];
  id: number;
}

export interface CreateUserOutput {
  result: CreateUserOutputItem;
}
