import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink,RouterOutlet,StarRatingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router) { };

  onActivate():void{
    //get current route..
    const currentRoute = this.router.url;
    console.log('Route:',currentRoute);

    if(currentRoute === '/login' || currentRoute === '/register'){
      // Calculate the offset as 10% of the window's height
      const yOffset = window.innerHeight * 0.15;
      window.scrollTo(0,yOffset);
    }else{
      window.scrollTo(0, 0);
      console.log('Scrolling to top.');
    }
 }
}