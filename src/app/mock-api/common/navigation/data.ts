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
        link : '/news/all'
      },
      {
        id   : 'newsByCategory',
        title: 'News By Category',
        type : 'basic',
        link : '/news/category'
      },
      {
        id   : 'bio-bio',
        title: 'Radio Bío Bío',
        type : 'basic',
        link : '/news/bio-bio'
      },
    ]
  },
  {
    id      : 'apps',
    title   : 'Applications',
    type    : 'collapsable',
    icon    : 'heroicons_outline:squares-2x2',
    link    : '/apps',
    children: [
      {
        id   : 'gallery',
        title: 'Gallery',
        type : 'basic',
        link: '/apps/albums'
      },
      {
        id   : 'scrumboards',
        title: 'Scrum boards',
        type : 'basic',
        link : '/apps/scrumboards'
      }
    ]
  }
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
        link : '/news/all'
      },
      {
        id   : 'newsByCategory',
        title: 'News By Category',
        type : 'basic',
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
        link : '/multimedia/gallery'
      },
      {
        id   : 'videos',
        title: 'Videos',
        type : 'basic',
        link : '/multimedia/videos'
      },
    ]
  },
];
