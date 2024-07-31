export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  company?: {
    name: string;
    email: string;
    nationalId: string;
    country?: string;
    website: string;
  };
  token?: string;
}
