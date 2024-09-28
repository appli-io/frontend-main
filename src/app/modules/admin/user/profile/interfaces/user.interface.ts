import { ICompany } from '@core/domain/interfaces/company.interface';
import { IFile }    from '@modules/admin/news/domain/interfaces/news.interface';
import { Contact }  from '@modules/admin/apps/contacts/models/contact.type';

export interface IUser {
    id?: string;
    name?: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    avatar?: IFile;
    birthdate?: string;
    location?: string;
    city?: string;
    country?: string;
    gender?: 'M' | 'F';
    positions?: { position: string, companyId: string };
    assignedCompanies?: Partial<ICompany>[];
    settings?: Record<string, any>;
    portrait?: string;
    contacts?: Contact[];
    bio?: string;

    // Application state (not from the API)
    status?: string;
}
