import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { environment } from '../environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations'
import en from '@angular/common/locales/en';
registerLocaleData(en);

/** config ng-zorro-antd i18n **/
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { ApiInterceptor } from './_interceptors/api.interceptor';
import { appRoutes } from './app.routes';
import { apiListenerInterceptor } from './_interceptors/api-listener.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi(),withInterceptors([apiListenerInterceptor])),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useValue: new ApiInterceptor(environment.baseUrl),
      multi: true
    },
    provideNzI18n(en_US)
  ]
};