import { IImage } from '@modules/admin/news/domain/interfaces/news.interface';

export interface IAlbumImage {
  id: string;
  original: IImage;
  thumbnail: IImage;
  size: number;
  uploadedBy: string;
  company: string;
  album: string;
  createdAt: Date;
  updatedAt: Date;
}
