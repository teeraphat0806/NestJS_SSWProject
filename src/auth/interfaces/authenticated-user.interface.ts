import { Role } from '../../common/enums';

export interface AuthenticatedUser {
  userId: number;
  email: string;
  role: Role;
}
