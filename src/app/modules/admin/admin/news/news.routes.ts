import { Routes }              from '@angular/router';
import { inject }              from '@angular/core';
import { NewsService }         from '@modules/admin/admin/news/news.service';
import { NewsCategoryService } from '@shared/selectors/components/news-categories-selector/news-category.service';

export default [
    {
        path         : '',
        loadComponent: () => import('./news.component').then(m => m.NewsComponent),
        children     : [
            {
                path         : '',
                loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent),
                resolve      : {
                    news                  : () => inject(NewsService).getNews({}),
                    categories            : () => inject(NewsService).getCategories(),
                    newsCategoriesSelector: () => inject(NewsCategoryService).getSelector()
                },
            },
            {
                path         : 'create',
                loadComponent: () => import('./pages/create/create.component').then(m => m.CreateComponent),
            },
            {
                path    : 'categories',
                children: [
                    {
                        path         : '',
                        loadComponent: () => import('./pages/category/list/list.component').then(m => m.ListComponent),
                        resolve      : {
                            categories: () => inject(NewsService).getCategories()
                        }
                    },
                    {
                        path         : 'create',
                        loadComponent: () => import('./pages/category/create/create.component').then(m => m.CreateComponent),
                    }
                ]
            },
            {path: '**', redirectTo: '', pathMatch: 'full'}
        ]
    },
] as Routes;
