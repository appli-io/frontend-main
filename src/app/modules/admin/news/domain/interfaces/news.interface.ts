import { INewsCategory } from '@modules/admin/news/domain/interfaces/category.interface';
import { IUser }         from '@modules/admin/profile/interfaces/user.interface';
import { IFile }         from '@core/interfaces/file';

export interface INews {
  id?: string;
  headline?: string;
  slug?: string;
  abstract?: string;
  body?: string;
  images?: INewsImage[];
  portraitImage?: INewsImage;
  isDeleted?: boolean;
  publishedAt?: Date;
  updatedAt?: Date;

  category?: Partial<INewsCategory>;
  createdBy?: Partial<IUser>;
}

export interface INewsImage {
  name: string,
  filepath: string,
  contentType: string,
  file?: IFile
}
