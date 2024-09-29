import { RoleEnum } from '@modules/admin/admin/users/enums/role.enum';
import { IUser }    from '@modules/admin/user/profile/interfaces/user.interface';

export interface CompanyUser extends IUser {
    role: RoleEnum;
    position: string;
}
