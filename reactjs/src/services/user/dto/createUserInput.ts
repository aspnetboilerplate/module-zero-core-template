export interface CreateUserInput {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  roleNames: string[];
  password: string;
}
