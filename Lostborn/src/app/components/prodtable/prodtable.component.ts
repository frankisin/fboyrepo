import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LostbornService } from '../../services/lostborn.service';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProductContentComponent } from '../../dialogue/product/product.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-prodtable',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatPaginatorModule,
    MatTableModule, MatSortModule, MatSelectModule,
    FormsModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './prodtable.component.html',
  styleUrls: ['./prodtable.component.css']
})

export class ProdtableComponent implements AfterViewInit {
  //component props...
  members: any[] = []; // members prop populated by backend read...
  isEditing: boolean = false;
  isDeveloper: boolean = true;
  isDirty: boolean = false;

  // Create separate form controls for each select control
  ipPlanControl = new FormControl('');
  userTypeControl = new FormControl('');
  accessPageControl = new FormControl('');
  accessTypeControl = new FormControl('');

  dataSource = new MatTableDataSource<Record>(); //initialize Data Source obj.
  dataSourceLength: number = 0

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'ID',
    'Title',
    'Weight',
    'Description',
    'Price',
    'ImageUrl',
    'ProdStatus',
    'ProdFrag',
    'DescriptionLong',
    'InStock',
    'AverageRating',
    'ImageUrlDetail',
  ];

  toppings = new FormControl('');

  constructor(private lostBornService: LostbornService, public dialog: MatDialog) { } // construct service object

  ngAfterViewInit() {
    this.lostBornService.getAllProductData().subscribe((data?: Record[]) => {
      this.members = data || []; // snapshot data.
      this.dataSource = new MatTableDataSource(data); //pass data to data source obj

      this.dataSource.paginator = this.paginator; //set paginator.
      this.dataSource.sort = this.sort; //set sorter. 
      
      this.dataSourceLength = this.dataSource.data.values.length;

    });
  }
  onRowClick(row: any): void {
    console.log('Row cicked: ', row);
    const dialogRef = this.dialog.open(ProductContentComponent, {
      data: {
        isNew: false, // Set isNew to true for a new record
        row: row as any,
      },
      width: '700px', // You can adjust the width as needed
      height: '680px',
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed:', result);
      // You can add additional logic after the dialog is closed
      // Fetch updated data after closing the dialog
      this.lostBornService.getAllProductData().subscribe((data?: Record[]) => {
        console.log('Making backend read...');
        this.members = data || [];
        this.dataSource.data = this.members; // Update the data source
      });
    });
  }
  onChange():void{
    this.isDirty = true; 
  }
  onAddRow(): void {
    console.log('Attempting to add row...');
    const dialogRef = this.dialog.open(ProductContentComponent, {
      data: {
        isNew: true, // Set isNew to true for a new record
      },
      width: '700px', // You can adjust the width as needed
      height: '680px',
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed:', result);
      // You can add additional logic after the dialog is closed
      // Fetch updated data after closing the dialog
      this.lostBornService.getAllProductData().subscribe((data?: Record[]) => {
        console.log('Making backend read...');
        this.members = data || [];
        this.dataSource.data = this.members; // Update the data source
      });
    });
  }
  applyFilterSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
}
export interface Record {
  ID: number;
  Title: string;
  Weight: string;
  Description: string;
  Price: number;
  ImageUrl: string;
  ProdStatus: string[]; // Update the type accordingly based on the actual type of ProdStatus
  ProdFrag: string[]; // Update the type accordingly based on the actual type of ProdFrag
  DescriptionLong: string;
  InStock: number;
  AverageRating: number;
  ImageUrlDetail: string;
}

