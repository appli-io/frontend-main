import { IFile }       from '@modules/admin/news/domain/interfaces/news.interface';
import { IUser }       from '@modules/admin/user/profile/interfaces/user.interface';
import { IAlbumImage } from '@modules/admin/apps/albums/interfaces/album-image.interface';

export interface IAlbum {
  id: string;
  name: string;
  description: string;
  cover: IFile;
  coverThumbnail: IFile;
  images: IAlbumImage[];
  imagesCount: number;
  createdBy: IUser;
  createdAt: Date;
  updatedAt: Date;
}
