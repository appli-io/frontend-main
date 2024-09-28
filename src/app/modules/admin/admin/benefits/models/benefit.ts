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

export class BenefitMapper {
    static fromForm(rawForm: any, isNew: boolean = true): Benefit {
        return {
            ...rawForm,
            categoryId: rawForm.category ? rawForm.category.id : undefined,
            companyId : rawForm.company ? rawForm.company.id : undefined,
        };
    }

    static toFormData(benefit: Benefit): FormData {
        const formData: FormData = new FormData();

        Object.keys(benefit).forEach((key) => {
            if (benefit[key] instanceof File) {
                formData.append(key, benefit[key]);
            } else {
                formData.append(key, JSON.stringify(benefit[key]));
            }
        });

        return formData;
    }
}
