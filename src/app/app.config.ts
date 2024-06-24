import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimationsAsync(),
<<<<<<< HEAD
    provideAnimationsAsync(), provideAnimationsAsync(),
=======
    provideAnimationsAsync(),
    provideToastr()
>>>>>>> c98215bb033200cc34515613820e528d58fe3faa
  ],
};
