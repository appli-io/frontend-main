export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  location: string;
  position: string;
  settings: Record<string, any>;
  portrait: string;
}
