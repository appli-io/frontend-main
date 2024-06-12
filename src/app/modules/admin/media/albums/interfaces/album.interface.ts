import { IImage } from '@modules/admin/news/domain/interfaces/news.interface';
import { IUser }  from '@modules/admin/profile/interfaces/user.interface';

export interface IAlbum {
  id: string;
  name: string;
  description: string;
  cover: IImage;
  coverThumbnail: IImage;
  createdBy: IUser;
  createdAt: Date;
  updatedAt: Date;
}
