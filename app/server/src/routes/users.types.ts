import { UserDTO, UserRole, UserStatus } from "../data/users.types.js";

export interface CreateUserRequestBody {
  name: string;
  birthDate: string;
  email: string;
  password: string;

  avatar?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface UpdateUserRequestBody extends Partial<UserDTO> {}
