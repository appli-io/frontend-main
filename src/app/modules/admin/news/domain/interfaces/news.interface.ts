import { INewsCategory } from '@modules/admin/news/domain/interfaces/category.interface';
import { IUser }         from '@modules/admin/user/profile/interfaces/user.interface';

export interface INews {
  id?: string;
  headline?: string;
  slug?: string;
  abstract?: string;
  body?: string;
  images?: IFile[];
  portraitImage?: IFile;
  publishedAt?: Date;
  updatedAt?: Date;

  category?: Partial<INewsCategory>;
  createdBy?: Partial<IUser>;

  custom: Record<string, any>;
}

export interface IFile {
  name: string,
  filepath?: string,
  contentType?: string,
  fileUrl?: string
}
