import { IFile }    from '@modules/admin/news/domain/interfaces/news.interface';
import { RoleEnum } from '@modules/admin/admin/users/enums/role.enum';

export interface CompanyUser {
    id: string;
    name: string;
    username: string;
    email: string;
    role: RoleEnum;
    position: string;
    avatar: IFile;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    createdBy: string;
    joined: boolean;
}
