import { enableProdMode }       from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import * as Sentry from '@sentry/angular';

import { AppComponent } from 'app/app.component';
import { appConfig }    from 'app/app.config';
import { environment }  from './environments/environment';

Sentry.init({
    dsn         : 'https://506a79677510e4799487506470da5688@o4507732277395456.ingest.us.sentry.io/4507739816394752',
    integrations: [
        Sentry.browserTracingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: [ 'localhost', /^https:\/\/frontend-main-development\.up\.railway\.app\/api/, /^https:\/\/frontend-main-production\.up\.railway\.app\/api/ ],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    environment             : environment.production ? 'production' : 'development',
});

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
    .catch(err => console.error(err));
