import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FormJsonCreator } from './services/formjsoncreator.service';
import { DropzoneManagementService } from './services/dropzonemanagement.service';
import { FormcontrolNameGenerator } from './services/formcontrolnamegenerator.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    FormJsonCreator,
    FormcontrolNameGenerator,
    DropzoneManagementService,
  ],
};
