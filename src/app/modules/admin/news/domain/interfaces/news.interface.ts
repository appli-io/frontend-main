import { INewsCategory } from '@modules/admin/news/domain/interfaces/category.interface';
import { IUser }         from '@modules/admin/profile/interfaces/user.interface';

export interface INews {
  id?: string;
  headline?: string;
  slug?: string;
  abstract?: string;
  body?: string;
  images?: IImage[];
  portraitImage?: IImage;
  isDeleted?: boolean;
  publishedAt?: Date;
  updatedAt?: Date;

  category?: Partial<INewsCategory>;
  createdBy?: Partial<IUser>;
}

export interface IImage {
  name: string,
  filepath: string,
  contentType: string,
  file?: string
}
