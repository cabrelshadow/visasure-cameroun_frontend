import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      BrowserAnimationsModule, // Nécessaire pour les animations de Ngx-Toastr
      ToastrModule.forRoot({
        timeOut: 7000, // Le toast disparaîtra après 2 secondes
        positionClass: 'toast-top-right', // Affiché en haut à droite
        closeButton: true, // Ajoute un bouton de fermeture
      })
    ),
  ],
};
