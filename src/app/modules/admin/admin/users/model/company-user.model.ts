import { IImage }   from '@modules/admin/news/domain/interfaces/news.interface';
import { RoleEnum } from '@modules/admin/admin/users/enums/role.enum';

export interface CompanyUser {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: IImage;
  role: RoleEnum;
  isActive: boolean;
  createdAt: Date;
}
