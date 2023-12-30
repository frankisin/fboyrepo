import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TableComponent } from '../table/table.component';
import { ProdtableComponent } from '../prodtable/prodtable.component';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent,TableComponent,MatTabsModule,ProdtableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  isAdmin: boolean = false;
  isDeveloper : boolean = false;
  canEdit : boolean = true;

}
