import { ICompany }        from '@core/domain/interfaces/company.interface';
import { BenefitTypeEnum } from '@modules/admin/admin/benefits/enums/benefit-type.enum';
import { IFile }           from '@modules/admin/news/domain/interfaces/news.interface';
import { BenefitCategory } from '@modules/admin/admin/benefits/models/benefit-category';
import { CompanyUser }     from '@modules/admin/admin/users/model/company-user.model';

export interface Benefit {
  id: string;
  name?: string;
  description?: string;
  requirements?: string;
  conditions?: string;
  discounts?: Record<string, any>;
  dueDate?: Date;
  type?: BenefitTypeEnum;
  image?: IFile;
  benefitCompany?: any;
  category?: BenefitCategory;
  company?: ICompany;
  createdBy?: CompanyUser;
  locations?: any;
  createdAt: Date;
  updatedAt: Date;
}
