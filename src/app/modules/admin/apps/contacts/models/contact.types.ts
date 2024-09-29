import { ContactTypeEnum } from '@modules/admin/apps/contacts/enums/contact-type.enum';

export interface Contact {
    id?: string;
    value: string,
    label: string,
    type?: ContactTypeEnum,
    companyId?: string
}
