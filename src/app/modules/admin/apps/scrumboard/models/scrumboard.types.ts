import { IFile } from '@modules/admin/news/domain/interfaces/news.interface';

export interface IBoard {
    id?: string | null;
    title: string;
    description?: string | null;
    icon?: string | null;
    lastActivity?: string | null;
    lists?: IList[];
    labels?: ILabel[];
    members?: IMember[];
}

export interface IList {
    id?: string | null;
    boardId: string;
    position: number;
    title: string;
    cards?: ICard[];
}

export interface ICard {
    id?: string | null;
    boardId: string;
    listId: string;
    position: number;
    title: string;
    description?: string | null;
    labels?: ILabel[];
    dueDate?: string | null;
}

export interface IMember {
    id?: string;
    name: string;
    avatar?: IFile;
    position?: string;
}

export interface ILabel {
    id: string | null;
    boardId: string;
    title: string;
}
