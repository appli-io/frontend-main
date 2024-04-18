import { ICompany } from '@core/domain/interfaces/company.interface';

export interface IUser {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  avatar?: string;
  location?: string;
  positions?: { position: string, companyId: string };
  assignedCompanies?: Partial<ICompany>[];
  settings?: Record<string, any>;
  portrait?: string;

  // Application state (not from the API)
  status?: string;
}
