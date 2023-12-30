import { Component, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button';
import { LostbornService } from '../../services/lostborn.service';


@Component({
  selector: 'app-store',
  standalone: true,
  imports: [NavbarComponent, CardComponent, CommonModule, MatButtonModule],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  providers: [LostbornService],
})
export class StoreComponent implements AfterViewInit {

  dataSourceLength: number = 0;
  members: any[] = []; // Define members array

  rating: number = 3.5; // or any initial value

  constructor(private dataService: LostbornService) { } //Inject service in constructor...

  ngAfterViewInit(): void {
    this.dataService.getAllProductData().subscribe((data?: any[]) => {
      this.members = data || [];
      // Convert string representations to arrays
      this.members.forEach(member => {
        member.ProdFrag = JSON.parse(member.ProdFrag);
        member.ProdStatus = JSON.parse(member.ProdStatus);
      });

      this.dataSourceLength = this.members.length;
      console.log(this.members);
    });
  }

  cards: any[] = [
    {
      title: 'DS & DURGA',
      weight: '3.5',
      description: 'Jazmin Yukatan',
      price: 200.00,
      imageUrl: 'https://cdn.scentbird.com/product/rebrand/img-3397-2.jpg?w=640&bgcolor=f7efe9',
      prodStatus: ['CLEAN', 'NEW'],
      prodFrag: ['Cardamom', 'Ambroxan', 'Leather', 'Fig'],
      descriptionLong: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Praesentium at dolorem quidem modi. Nam sequi consequatur obcaecati excepturi alias magni,accusamus eius blanditiis delectus ipsam minima ea iste laborum vero?',
      inStock: 150,
      averageRating: 4.5,
      imageUrlDetail: 'https://cdn.scentbird.com/product/rebrand/img-3397-2.jpg?w=1152&bgcolor=fff',
    },
    {
      title: 'COMMODITY',
      weight: '3.5',
      description: 'MOSS + GOLD',
      price: 385.00,
      imageUrl: 'https://cdn.scentbird.com/product/rebrand/img-3360-3.jpg?w=640&bgcolor=f7efe9',
      prodStatus: ['CLEAN', 'NEW'],
      prodFrag: ['Coconut', 'Jasmine', 'White Florals', 'Vanilla'],
      descriptionLong: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Praesentium at dolorem quidem modi. Nam sequi consequatur obcaecati excepturi alias magni,accusamus eius blanditiis delectus ipsam minima ea iste laborum vero?',
      inStock: 200,
      averageRating: 4.5,
      imageUrlDetail: 'https://cdn.scentbird.com/product/rebrand/img-3360-3.jpg?w=640&bgcolor=fff',
    },
    {
      title: 'BRIONI',
      weight: '1.4',
      description: 'Essentiel',
      price: 195.00,
      imageUrl: 'https://cdn.scentbird.com/product/rebrand/img-3376-2.jpg?w=640&bgcolor=f7efe9',
      prodStatus: ['CLEAN'],
      prodFrag: ['Passion Flower', 'Vetiver', 'Bergamat', 'Copal'],
      descriptionLong: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Praesentium at dolorem quidem modi. Nam sequi consequatur obcaecati excepturi alias magni,accusamus eius blanditiis delectus ipsam minima ea iste laborum vero?',
      inStock: 100,
      averageRating: 4.5,
      imageUrlDetail: 'https://cdn.scentbird.com/product/rebrand/img-3376-2.jpg?w=640&bgcolor=fff',
    },
    {
      title: 'MAILO',
      weight: '3.4',
      description: 'Padre',
      price: 230.00,
      imageUrl: 'https://cdn.scentbird.com/product/rebrand/img-3329-2.jpg?w=640&bgcolor=f7efe9',
      prodStatus: ['CLEAN', 'NEW'],
      prodFrag: ['Patchouli', 'Bergamat', 'Petitgrain'],
      descriptionLong: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Praesentium at dolorem quidem modi. Nam sequi consequatur obcaecati excepturi alias magni,accusamus eius blanditiis delectus ipsam minima ea iste laborum vero?',
      inStock: 120,
      averageRating: 4.5,
      imageUrlDetail: 'https://cdn.scentbird.com/product/rebrand/img-3329-2.jpg?w=640&bgcolor=fff',
    },
    {
      title: 'Grace de Monaco',
      weight: '3.5',
      description: 'Ombre Sereine',
      price: 195.00,
      imageUrl: 'https://cdn.scentbird.com/product/rebrand/img-3311-3.jpg?w=640&bgcolor=f7efe9',
      prodStatus: ['NEW'],
      prodFrag: ['Tonka Bean Variety', 'Bergamat', 'Cardamom', 'Patchouli'],
      descriptionLong: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Praesentium at dolorem quidem modi. Nam sequi consequatur obcaecati excepturi alias magni,accusamus eius blanditiis delectus ipsam minima ea iste laborum vero?',
      inStock: 300,
      averageRating: 4.5,
      imageUrlDetail: 'https://cdn.scentbird.com/product/rebrand/img-3311-3.jpg?w=640&bgcolor=fff',
    },
    {
      title: 'Veronique',
      weight: '5',
      description: 'Ready for Rose',
      price: 265.00,
      imageUrl: 'https://cdn.scentbird.com/product/rebrand/img-3261-1.jpg?w=640&bgcolor=f7efe9',
      prodStatus: ['CLEAN', 'NEW'],
      prodFrag: ['Tonka Bean Variety', 'Passion Flower', 'Copal', 'Bergamat'],
      descriptionLong: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Praesentium at dolorem quidem modi. Nam sequi consequatur obcaecati excepturi alias magni,accusamus eius blanditiis delectus ipsam minima ea iste laborum vero?',
      inStock: 250,
      averageRating: 4.5,
      imageUrlDetail: 'https://cdn.scentbird.com/product/rebrand/img-3261-1.jpg?w=640&bgcolor=fff',
    },
  ];
  ngOnInit(): void {

  }
}

