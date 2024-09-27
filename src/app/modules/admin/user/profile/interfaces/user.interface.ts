import { ICompany } from '@core/domain/interfaces/company.interface';
import { IFile }    from '@modules/admin/news/domain/interfaces/news.interface';

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
    contacts?: any[];
    bio?: string;

  // Application state (not from the API)
  status?: string;
}
