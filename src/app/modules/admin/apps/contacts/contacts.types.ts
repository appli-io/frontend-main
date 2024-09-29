import { IUser }           from '@modules/admin/user/profile/interfaces/user.interface';
import { Contact }         from '@modules/admin/apps/contacts/models/contact.types';
import { ContactTypeEnum } from '@modules/admin/apps/contacts/enums/contact-type.enum';
import { IFile }           from '@modules/admin/news/domain/interfaces/news.interface';
import { isEqual }         from 'lodash';

export interface UserContact {
    id: string;
    avatar?: IFile;
    portrait?: IFile;
    name: string;
    emails?: Email[];
    phoneNumbers?: PhoneNumber[];
    position?: string;
    company?: string;
    birthday?: string | null;
    location?: string | null;
    notes?: string | null;
}

export interface Country {
    id: string;
    iso: string;
    name: string;
    code: string;
    flagImagePos: string;
}

export interface Tag {
    id?: string;
    title?: string;
}

export interface Email {
    email: string;
    label: string;
}

export interface PhoneNumber {
    country: string;
    phoneNumber: string;
    label: string;
}

export interface OtherContact {
    value: string;
    label: string;
}

export class UserContactMapper {
    static fromUser(user: IUser): UserContact {
        if (!user) {
            throw new Error('User data is required');
        }

        const contacts: Contact[] = user.contacts || [];
        const emails: Email[] = contacts
            .filter(({type}: Contact): Boolean => type === ContactTypeEnum.EMAIL)
            .map(({value, label}): Email => ({email: value, label}))
            .filter(Boolean);
        const phones: PhoneNumber[] = contacts
            .filter(({type}: Contact): Boolean => isEqual(type, ContactTypeEnum.PHONE))
            .map(({value, label}): PhoneNumber => {
                const {country, phoneNumber} = JSON.parse(value);
                return {country, phoneNumber, label};
            })
            .filter(Boolean);
        const socials: OtherContact[] = contacts
            .filter(({type}: Contact): Boolean => type === ContactTypeEnum.SOCIAL)
            .map(({value, label}): OtherContact => ({value, label}))
            .filter(Boolean);

        return {
            id          : user.id,
            avatar      : user.avatar,
            portrait    : user.portrait,
            name        : user.name || `${ user.firstname } ${ user.lastname }`,
            emails,
            phoneNumbers: phones,
            position    : user.position,
            birthday    : user.birthdate,
            location    : user.location,
            notes       : user.bio
        } as UserContact;
    }

    static fromUsers(users: IUser[]): UserContact[] {
        return users.map(user => UserContactMapper.fromUser(user));
    }
}
