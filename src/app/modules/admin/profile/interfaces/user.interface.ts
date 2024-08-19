import { ICompany } from '@core/domain/interfaces/company.interface';
import { IFile }    from '@modules/admin/news/domain/interfaces/news.interface';

export interface IUser {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  avatar?: IFile;
  location?: string;
  positions?: { position: string, companyId: string };
  assignedCompanies?: Partial<ICompany>[];
  settings?: Record<string, any>;
  portrait?: string;

  // Application state (not from the API)
  status?: string;
}
