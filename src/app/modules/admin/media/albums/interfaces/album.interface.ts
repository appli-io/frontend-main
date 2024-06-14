import { IImage }      from '@modules/admin/news/domain/interfaces/news.interface';
import { IUser }       from '@modules/admin/profile/interfaces/user.interface';
import { IAlbumImage } from '@modules/admin/media/albums/interfaces/album-image.interface';

export interface IAlbum {
  id: string;
  name: string;
  description: string;
  cover: IImage;
  coverThumbnail: IImage;
  images: IAlbumImage[];
  imagesCount: number;
  createdBy: IUser;
  createdAt: Date;
  updatedAt: Date;
}
