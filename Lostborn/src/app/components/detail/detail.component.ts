import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import {CardComponent} from '../card/card.component';

interface FragranceImages {
  [key: string]: string;
  // Add more paths as needed
}

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NavbarComponent,CommonModule,CardComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})

export class DetailComponent implements OnInit {

  title = '';
  weight = '';
  description = '';
  price = 0;
  imageUrl = '';
  prodFrag: string[] = [];
  prodStatus: any[] = [];
  descriptionLong = '';
  inStock = 0;
  averageRating = 0;
  imageUrlDetail = '';


  

  ngOnInit(): void {
    this.setDetailDataFromState();
  }

  private setDetailDataFromState(): void {
    const cardData = history.state.cardData;

    if (cardData) {
      this.title = cardData.title;
      this.weight = cardData.weight;
      this.description = cardData.description;
      this.price = cardData.price;
      this.imageUrl = cardData.imageUrl;
      this.prodFrag = cardData.prodFrag;
      this.prodStatus = cardData.prodStatus;
      this.descriptionLong = cardData.descriptionLong;
      this.inStock = cardData.inStock;
      this.averageRating = cardData.averageRating;
      this.imageUrlDetail = cardData.imageUrlDetail;
    }
    console.log('Model initialized: ',cardData);
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
  fragranceImages : FragranceImages = {
    'Cardamom':'https://cdn.scentbird.com/notes/rebrand/img-63-1.jpg?w=128&bgcolor=fff',
    'Ambroxan':'https://cdn.scentbird.com/notes/rebrand/img-563-3.jpg?w=128&bgcolor=fff',
    'Leather':'https://cdn.scentbird.com/notes/rebrand/156.jpg?w=128&bgcolor=fff',
    'Fig':'https://cdn.scentbird.com/notes/rebrand/247.jpg?w=128&bgcolor=fff',
    'Coconut':'https://cdn.scentbird.com/notes/rebrand/138.jpg?w=128&bgcolor=fff',
    'Jasmine':'https://cdn.scentbird.com/notes/rebrand/14.jpg?w=128&bgcolor=fff',
    'White Florals':'https://cdn.scentbird.com/notes/rebrand/img-1953-1.jpg?w=128&bgcolor=fff',
    'Vanilla': 'https://cdn.scentbird.com/notes/rebrand/74.jpg?w=128&bgcolor=fff',
    'Passion Flower': 'https://cdn.scentbird.com/notes/rebrand/img-162-1.jpg?w=128&bgcolor=fff',
    'Vetiver':'https://cdn.scentbird.com/notes/rebrand/1229.jpg?w=128&bgcolor=fff',
    'Bergamat':'https://cdn.scentbird.com/notes/rebrand/75.jpg?w=128&bgcolor=fff',
    'Copal':'https://cdn.scentbird.com/notes/rebrand/img-542-4.jpg?w=128&bgcolor=fff',
    'Patchouli':'https://cdn.scentbird.com/notes/rebrand/34.jpg?w=128&bgcolor=fff',
    'Petitgrain':'https://cdn.scentbird.com/notes/rebrand/3.jpg?w=128&bgcolor=fff',
    'Tonka Bean Variety':'https://cdn.scentbird.com/notes/rebrand/img-1960-1.jpg?w=128&bgcolor=fff',
  }
}


