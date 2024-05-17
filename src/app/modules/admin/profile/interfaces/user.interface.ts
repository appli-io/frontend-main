import { ICompany } from '@core/domain/interfaces/company.interface';
import { IFile }    from '@core/interfaces/file';

export interface IUser {
  id?: number;
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
