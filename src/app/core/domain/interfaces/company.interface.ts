import { IFile } from '@modules/admin/news/domain/interfaces/news.interface';

export interface ICompany {
    id?: string;
    name?: string;
    username?: string;
    description?: string;
    logo?: IFile;
    email?: string;
    website?: string;
    isVerified?: boolean;
    isActive?: boolean;
    country?: string;
}
