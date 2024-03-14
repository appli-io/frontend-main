import { provideHttpClient }                                                       from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, inject }         from '@angular/core';
import { LuxonDateAdapter }                                                        from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_FORMATS }                                           from '@angular/material/core';
import { provideAnimations }                                                       from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';

import { IonicStorageModule }                 from '@ionic/storage-angular';
import { provideTransloco, TranslocoService } from '@ngneat/transloco';
import { firstValueFrom }                     from 'rxjs';


import { provideAuth }         from '@core/auth/auth.provider';
import { provideIcons }        from '@core/icons/icons.provider';
import { TranslocoHttpLoader } from '@core/transloco/transloco.http-loader';
import { provideFuse }         from '@fuse';
import { StorageService }      from '@fuse/services/storage';
import { appRoutes }           from 'app/app.routes';
import { mockApiServices }     from 'app/mock-api';

export const appConfig: ApplicationConfig = {
  providers: [

    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({scrollPositionRestoration: 'enabled'}),
    ),
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: 'wwtDB'
      })
    ),

    // Material Date Adapter
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'D',
        },
        display: {
          dateInput: 'DDD',
          monthYearLabel: 'LLL yyyy',
          dateA11yLabel: 'DD',
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
        defaultLang: 'en',
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: true,
      },
      loader: TranslocoHttpLoader,
    }),
    {
      // Preload the default language before the app starts to prevent empty/jumping content
      provide: APP_INITIALIZER,
      useFactory: () => {
        const translocoService = inject(TranslocoService);
        const storageService = inject(StorageService);

        return () => new Promise((resolve, reject) => {
          storageService.whenReady().then(() => {
            storageService.get('activeLang').then((defaultLang) => {
              if (!defaultLang)
                defaultLang = translocoService.getDefaultLang();

              translocoService.setActiveLang(defaultLang);
              return firstValueFrom(translocoService.load(defaultLang));
            });
          }).then(resolve).catch(reject);
        });
      },
      multi: true,
      deps: [ TranslocoService ],
    },

    // Fuse
    provideAuth(),
    provideIcons(),
    provideFuse({
      mockApi: {
        delay: 0,
        services: mockApiServices,
      },
      fuse: {
        layout: 'classic',
        scheme: 'auto',
        screens: {
          sm: '600px',
          md: '960px',
          lg: '1280px',
          xl: '1440px',
        },
        theme: 'theme-default',
        themes: [
          {
            id: 'theme-default',
            name: 'Default',
          },
        ],
      },
    }),
  ],
};
