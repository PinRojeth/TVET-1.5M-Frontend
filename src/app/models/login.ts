import { User } from './user';

export interface Login {
  user: User;
  token: string;
  refresh_token: string;
}
