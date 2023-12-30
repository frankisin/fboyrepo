import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface FragranceImages {
  [key: string]: string;
  // Add more paths as needed
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent {
  @Input() title: string = '';
  @Input() weight: string = '';
  @Input() description: string = '';
  @Input() price: number = 0;
  @Input() imageUrl: string = '';
  @Input() prodFrag: string[] = [];
  @Input() prodStatus: string[] = []; // Update type to string array
  @Input() descriptionLong = '';
  @Input() inStock = 0;
  @Input() averageRating = 0;
  @Input() imageUrlDetail = '';
  

  constructor(private router: Router) { }

  fragranceImages : FragranceImages = {
    'Cardamom':'https://cdn.scentbird.com/notes/rebrand/img-63-1.jpg?w=128&bgcolor=f7efe9',
    'Ambroxan':'https://cdn.scentbird.com/notes/rebrand/img-563-3.jpg?w=128&bgcolor=f7efe9',
    'Leather':'https://cdn.scentbird.com/notes/rebrand/156.jpg?w=128&bgcolor=f7efe9',
    'Fig':'https://cdn.scentbird.com/notes/rebrand/247.jpg?w=128&bgcolor=f7efe9',
    'Coconut':'https://cdn.scentbird.com/notes/rebrand/138.jpg?w=128&bgcolor=f7efe9',
    'Jasmine':'https://cdn.scentbird.com/notes/rebrand/14.jpg?w=128&bgcolor=f7efe9',
    'White Florals':'https://cdn.scentbird.com/notes/rebrand/img-1953-1.jpg?w=128&bgcolor=f7efe9',
    'Vanilla': 'https://cdn.scentbird.com/notes/rebrand/74.jpg?w=128&bgcolor=f7efe9',
    'Passion Flower': 'https://cdn.scentbird.com/notes/rebrand/img-162-1.jpg?w=128&bgcolor=f7efe9',
    'Vetiver':'https://cdn.scentbird.com/notes/rebrand/1229.jpg?w=128&bgcolor=f7efe9',
    'Bergamat':'https://cdn.scentbird.com/notes/rebrand/75.jpg?w=128&bgcolor=f7efe9',
    'Copal':'https://cdn.scentbird.com/notes/rebrand/img-542-4.jpg?w=128&bgcolor=f7efe9',
    'Patchouli':'https://cdn.scentbird.com/notes/rebrand/34.jpg?w=128&bgcolor=f7efe9',
    'Petitgrain':'https://cdn.scentbird.com/notes/rebrand/3.jpg?w=128&bgcolor=f7efe9',
    'Tonka Bean Variety':'https://cdn.scentbird.com/notes/rebrand/img-1960-1.jpg?w=128&bgcolor=f7efe9',
  }
  onGoDetail(): void {
    this.router.navigate(['/store/detail'], {
      state: {
        cardData: {
          title: this.title,
          weight: this.weight,
          description: this.description,
          price: this.price,
          imageUrl: this.imageUrl,
          prodFrag: this.prodFrag,
          prodStatus: this.prodStatus,
          descriptionLong: this.descriptionLong,
          inStock: this.inStock,
          averageRating: this.averageRating,
          imageUrlDetail: this.imageUrlDetail,
        },
      },
    });
  }
  ngOnInit(): void {
    
  }
}
