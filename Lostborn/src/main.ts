import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideHttpClient} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';


//Always add new components to Bootstrap Array!
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),provideHttpClient(), provideAnimations()]
}).catch((err)=>console.log(err));
