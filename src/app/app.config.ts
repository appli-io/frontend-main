import { provideHttpClient }                                                                            from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, inject }                              from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS }                                                                from '@angular/material/core';
import { LuxonDateAdapter }                                                                             from '@angular/material-luxon-adapter';
import { provideAnimations }                                                                            from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading, withViewTransitions } from '@angular/router';

import { IonicStorageModule }                                 from '@ionic/storage-angular';
import { provideTransloco, TranslocoService }                 from '@ngneat/transloco';
import { CalendarCommonModule, DateAdapter as DateAdapterAC } from 'angular-calendar';
import { adapterFactory }                                     from 'angular-calendar/date-adapters/date-fns';
import { firstValueFrom }                                     from 'rxjs';


import { provideAuth }         from '@core/auth/auth.provider';
import { provideIcons }        from '@core/icons/icons.provider';
import { TranslocoHttpLoader } from '@core/transloco/transloco.http-loader';
import { provideFuse }         from '@fuse';
import { StorageService }      from '@fuse/services/storage';
import { appRoutes }           from 'app/app.routes';
import { mockApiServices }     from 'app/mock-api';
import { LightgalleryModule }  from 'lightgallery/angular';

export const appConfig: ApplicationConfig = {
  providers: [

    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({scrollPositionRestoration: 'enabled'}),
      withViewTransitions()
    ),
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: 'wwtDB'
      }),
      CalendarCommonModule.forRoot({
        provide   : DateAdapterAC,
        useFactory: adapterFactory
      }),
      LightgalleryModule
    ),

    // Material Date Adapter
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
    },
    {
      provide : MAT_DATE_FORMATS,
      useValue: {
        parse  : {
          dateInput: 'D',
        },
        display: {
          dateInput     : 'DDD',
          monthYearLabel: 'LLL yyyy',
          dateA11yLabel : 'DD',
          monthYearA11yLabel: 'LLLL yyyy',
        },
      },
    },

    // Transloco Config
    provideTransloco({
      config: {
        availableLangs: [
          {
            id: 'en',
            label: 'English',
          },
          {
            id: 'es',
            label: 'Spanish',
          },
        ],
        defaultLang   : 'es',
        fallbackLang  : 'es',
        reRenderOnLangChange: true,
        prodMode      : true,
      },
      loader: TranslocoHttpLoader,
    }),
    {
      // Preload the default language before the app starts to prevent empty/jumping content
      provide   : APP_INITIALIZER,
      useFactory: () => {
        const translocoService = inject(TranslocoService);
        const storageService = inject(StorageService);

        return () => storageService.whenReady().then(() => {
          storageService.get('activeLang').then((defaultLang) => {
            if (!defaultLang)
              defaultLang = translocoService.getDefaultLang();

            translocoService.setActiveLang(defaultLang);
            return firstValueFrom(translocoService.load(defaultLang));
          });
        });
      },
      multi     : true,
      deps      : [ TranslocoService ],
    },
    // Fuse
    provideAuth(),
    provideIcons(),
    provideFuse({
      mockApi: {
        delay: 0,
        services: mockApiServices,
      },
      fuse   : {
        layout: 'classic',
        scheme: 'auto',
        screens: {
          sm: '600px',
          md: '960px',
          lg: '1280px',
          xl: '1440px',
        },
        theme : 'theme-default',
        themes: [
          {
            id: 'theme-default',
            name: 'Default',
          },
          {
            id  : 'theme-brand',
            name: 'Brand',
          },
          {
            id  : 'theme-teal',
            name: 'Teal',
          },
          {
            id  : 'theme-rose',
            name: 'Rose',
          },
          {
            id  : 'theme-purple',
            name: 'Purple',
          },
          {
            id  : 'theme-amber',
            name: 'Amber',
          },
        ],
      },
    }),
  ],
};
