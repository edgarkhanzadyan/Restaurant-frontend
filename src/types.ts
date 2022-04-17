export type UserRole = 'regular' | 'owner' | 'admin';

export type User = {
  name: string;
  role: UserRole;
  accessToken: string;
  email: string;
};
