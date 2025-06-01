import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthHttpInterceptor, provideAuth0 } from '@auth0/auth0-angular';
import { environment } from './environments/environment.prod';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-s0fcza4jc8t1ucnt.eu.auth0.com',
      clientId: 'BDuYiN7T0Qvh1qRAeCJcWYJykZyCXNiI',
      authorizationParams: {
        redirect_uri: window.location.origin
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
      httpInterceptor: {
        allowedList: [environment.apiUrl],
      }
    }),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor, // Use the class directly
      multi: true // Essential for providing multiple interceptors
    }
  ]
};
