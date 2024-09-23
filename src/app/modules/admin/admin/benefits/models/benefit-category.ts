import { CompanyUser } from '@modules/admin/admin/users/model/company-user.model';
import { IFile }       from '@modules/admin/news/domain/interfaces/news.interface';
import { DateTime }    from 'luxon';
import { Selector }    from '../../../../../shared/selectors/model/selector';

export interface BenefitCategory {
  id?: string;
  name?: string;
  description?: string;
  active?: boolean;
  order?: number;
  icon?: IFile;
  image?: IFile;
  metadata?: Record<string, any>;
  parent?: BenefitCategory;
  company?: any;
  createdBy?: CompanyUser;
  subCategories?: BenefitCategory[];
  benefits: any;
  views?: any[];
  createdAt?: DateTime;
  updatedAt?: DateTime;
  deletedAt?: DateTime;
}

export class BenefitCategoryMapper {
  static toSelector(category: BenefitCategory): Selector {
    return {
      label : category.name,
      value : category.id,
      parent: category.parent
    };
  }
}
