import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-s0fcza4jc8t1ucnt.eu.auth0.com',
      clientId: 'BDuYiN7T0Qvh1qRAeCJcWYJykZyCXNiI',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ]
};
