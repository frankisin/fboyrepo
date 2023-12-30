import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LostbornService } from '../../services/lostborn.service';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../../dialogue/dialog-content/dialog-content.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatPaginatorModule,
    MatTableModule, MatSortModule, MatSelectModule,
    FormsModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements AfterViewInit {
  //component props...
  members: any[] = []; // members prop populated by backend read...
  isEditing: boolean = false;
  isDeveloper: boolean = true;


  ipSelectOptions: any[] = [];
  userSelectOptions: any[] = [];
  planStatusSelectOptions: any[] = [];
  accessPageSelectOptions: any[] = [];
  accessTypeSelectOptions: any[] = [];

  selectedIPOption: string = '';
  selectedUserOption: string = '';
  selectedAccessPageOption: string = '';
  selectedAccessTypeOption: string = '';

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

  displayedColumns: string[] = ['ID', 'IP_PLAN', 'PLAN_YEAR', 'OPRCLASS', 'PLAN_STATUS', 'ACCESS_PAGES', 'ACCESS_TYPE', 'FROM_DT', 'TO_DT'];

  toppings = new FormControl('');

  constructor(private lostBornService: LostbornService, public dialog: MatDialog) { } // construct service object

  ngAfterViewInit() {
    this.lostBornService.getAllMembers().subscribe((data?: Record[]) => {
      this.members = data || []; // snapshot data.
      console.log(this.members);
      this.dataSource = new MatTableDataSource(data); //pass data to data source obj

      this.dataSource.paginator = this.paginator; //set paginator.
      this.dataSource.sort = this.sort; //set sorter. 

      this.dataSourceLength = this.dataSource.data.values.length;

      //set select controls..
      this.ipSelectOptions = Array.from(new Set(data?.map(record => record.IP_PLAN)));
      this.userSelectOptions = Array.from(new Set(data?.map(record => record.OPRCLASS)));
      this.accessPageSelectOptions = Array.from(new Set(data?.map(record => record.ACCESS_PAGES)));
      this.accessTypeSelectOptions = Array.from(new Set(data?.map(record => record.ACCESS_TYPE)));
      this.planStatusSelectOptions = Array.from(new Set(data?.map(record => record.PLAN_STATUS)));

    });
  }
  onRowClick(row: any): void {
    console.log('Row cicked: ', row);
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: {
        isNew: false, // Set isNew to true for a new record
        row: row as any,
        ipSelectOptions : this.ipSelectOptions,
        userSelectOptions : this.userSelectOptions,
        planStatusSelectOptions: this.planStatusSelectOptions,
        accessPageSelectOptions: this.accessPageSelectOptions,
        accessTypeSelectOptions: this.accessTypeSelectOptions
      },
      width: '400px', // You can adjust the width as needed
      height: '475px',
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed:', result);
      // You can add additional logic after the dialog is closed
      // Fetch updated data after closing the dialog
      this.lostBornService.getAllMembers().subscribe((data?: Record[]) => {
        console.log('Making backend read...');
        this.members = data || [];
        this.dataSource.data = this.members; // Update the data source
      });
    });
  }
  onAddRow(): void {
    console.log('Attempting to add row...');
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: {
        isNew: true, // Set isNew to true for a new record
        ipSelectOptions : this.ipSelectOptions,
        userSelectOptions : this.userSelectOptions,
        planStatusSelectOptions: this.planStatusSelectOptions,
        accessPageSelectOptions: this.accessPageSelectOptions,
        accessTypeSelectOptions: this.accessTypeSelectOptions
        // other data properties...
      },
      width: '400px', // You can adjust the width as needed
      height: '475px',
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed:', result);
      // You can add additional logic after the dialog is closed
      // Fetch updated data after closing the dialog
      this.lostBornService.getAllMembers().subscribe((data?: Record[]) => {
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
  applyFilter() {
    // Get the selected values from form controls
    const selectedIpPlans = this.ipPlanControl.value;
    const selectedUserTypes = this.userTypeControl.value;
    const selectedAccessPages = this.accessPageControl.value;
    const selectedAccessTypes = this.accessTypeControl.value;

    // Filter the data source based on selected values
    const filteredData = this.members.filter(member => {
      return (
        (!selectedIpPlans?.length || selectedIpPlans.includes(member.IP_PLAN)) &&
        (!selectedUserTypes?.length || selectedUserTypes.includes(member.OPRCLASS)) &&
        (!selectedAccessPages?.length || selectedAccessPages.includes(member.ACCESS_PAGES)) &&
        (!selectedAccessTypes?.length || selectedAccessTypes.includes(member.ACCESS_TYPE))
      );
    });

    // Update the data source with filtered data
    this.dataSource.data = filteredData;
  }
}
export interface Record {
  ID: number;
  IP_PLAN: string;
  PLAN_YEAR: number;
  OPRCLASS: string;
  PLAN_STATUS: number;
  ACCESS_PAGES: string; // Update the type accordingly
  ACCESS_TYPE: string;
  FROM_DT: Date; // Update the type accordingly
  TO_DT: Date; // Update the type accordingly
}
