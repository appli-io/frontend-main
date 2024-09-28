import { IFile } from '@modules/admin/news/domain/interfaces/news.interface';

export interface IAlbumImage {
    id: string;
    original: IFile;
    thumbnail: IFile;
    size: number;
    uploadedBy: string;
    company: string;
    album: string;
    createdAt: Date;
    updatedAt: Date;
}
