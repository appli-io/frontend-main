/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
  {
    id   : 'home',
    title: 'Home',
    type : 'basic',
    icon : 'heroicons_outline:home',
    link : '/home'
  },
  // news
  {
    id      : 'news',
    title   : 'News',
    type    : 'collapsable',
    icon    : 'heroicons_outline:newspaper',
    link    : '/news',
    children: [
      {
        id   : 'allNews',
        title: 'All News',
        type : 'basic',
        icon : 'heroicons_outline:newspaper',
        link : '/news/all'
      },
      {
        id   : 'newsByCategory',
        title: 'News By Category',
        type : 'basic',
        icon : 'heroicons_outline:newspaper',
        link : '/news/category'
      },
    ]
  },
  // Multimedia (gallery and videos)
  {
    id      : 'multimedia',
    title   : 'Multimedia',
    type    : 'collapsable',
    icon    : 'heroicons_outline:photo',
    link    : '/multimedia',
    children: [
      {
        id   : 'gallery',
        title: 'Gallery',
        type : 'basic',
        icon : 'heroicons_outline:photo',
        link : '/multimedia/gallery'
      },
      {
        id   : 'videos',
        title: 'Videos',
        type : 'basic',
        icon : 'heroicons_outline:play-circle',
        link : '/multimedia/videos'
      },
    ]
  },
];
export const compactNavigation: FuseNavigationItem[] = [
  {
    id   : 'home',
    title: 'Home',
    type: 'basic',
    icon : 'heroicons_outline:home',
    link: '/example'
  }
];
export const futuristicNavigation: FuseNavigationItem[] = [
  {
    id   : 'home',
    title: 'Home',
    type: 'basic',
    icon : 'heroicons_outline:home',
    link: '/example'
  }
];
export const horizontalNavigation: FuseNavigationItem[] = [
  {
    id   : 'home',
    title: 'Home',
    type : 'basic',
    icon : 'heroicons_outline:home',
    link : '/home'
  },
  // news
  {
    id      : 'news',
    title   : 'News',
    type    : 'collapsable',
    icon    : 'heroicons_outline:newspaper',
    link    : '/news',
    children: [
      {
        id   : 'allNews',
        title: 'All News',
        type : 'basic',
        icon : 'heroicons_outline:newspaper',
        link : '/news/all'
      },
      {
        id   : 'newsByCategory',
        title: 'News By Category',
        type : 'basic',
        icon : 'heroicons_outline:newspaper',
        link : '/news/category'
      },
    ]
  },
  // Multimedia (gallery and videos)
  {
    id      : 'multimedia',
    title   : 'Multimedia',
    type    : 'collapsable',
    icon    : 'heroicons_outline:photo',
    link    : '/multimedia',
    children: [
      {
        id   : 'gallery',
        title: 'Gallery',
        type : 'basic',
        icon : 'heroicons_outline:photo',
        link : '/multimedia/gallery'
      },
      {
        id   : 'videos',
        title: 'Videos',
        type : 'basic',
        icon : 'heroicons_outline:play-circle',
        link : '/multimedia/videos'
      },
    ]
  },
];
