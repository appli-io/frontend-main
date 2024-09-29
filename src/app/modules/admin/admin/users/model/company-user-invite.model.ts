import { RoleEnum } from '@modules/admin/admin/users/enums/role.enum';

export interface CompanyUserInvite {
    readonly id: string;
    readonly email: string;
    readonly role: RoleEnum;
    readonly position: string;
    readonly message: string;
    readonly token: string;
    readonly joined: boolean;
    readonly createdAt: Date;
}
