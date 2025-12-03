import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockApiInterceptor } from './app/core/service/mock-api-interceptor';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    { provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor, multi: true },
  ]
}).catch((err) => console.error(err));
