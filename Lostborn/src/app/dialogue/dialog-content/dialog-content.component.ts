import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common'
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { LostbornService } from '../../services/lostborn.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog-content',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule,
    MatDividerModule, CommonModule,
    ReactiveFormsModule, MatSelectModule],
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.css'
})
export class DialogContentComponent {

  @Input() _data: any; // Input property to receive the data
  editForm!: FormGroup;

  record: any = []; //data we're passing thru.
  isEditing: boolean = false;
  isDirty: boolean = false;
  isNew: boolean = false;
  canDelete: boolean = true;

  //select options for dialogue...
  ipSelectOptions: any[] = [];
  userSelectOptions: any[] = [];
  planStatusSelectOptions: any[] = [];
  accessPageSelectOptions: any[] = [];
  accessTypeSelectOptions: any[] = [];

  // Create separate form controls for each select control
  ipPlanControl = new FormControl('');
  userTypeControl = new FormControl('');
  planStatusControl = new FormControl('');
  accessPageControl = new FormControl('');
  accessTypeControl = new FormControl('');

  // Define variables for each property
  ID: number = 0;
  IP_PLAN: string = '';
  PLAN_YEAR: string = '';
  OPRCLASS: string = '';
  PLAN_STATUS: string = '';
  ACCESS_PAGES: string = '';
  ACCESS_TYPE: string = '';
  FROM_DT: string = '';
  TO_DT: string = '';

  // Create a function to set values based on incoming data
  setData(data: any): void {
    this.ID = data.row.ID || 0;
    this.IP_PLAN = data.row.IP_PLAN || '';
    this.PLAN_YEAR = data.row.PLAN_YEAR || 0;
    this.OPRCLASS = data.row.OPRCLASS || '';
    this.PLAN_STATUS = data.row.PLAN_STATUS || 0;
    this.ACCESS_PAGES = data.row.ACCESS_PAGES || '';
    this.ACCESS_TYPE = data.row.ACCESS_TYPE || '';
    this.FROM_DT = data.row.FROM_DT || '';
    this.TO_DT = data.row.TO_DT || '';
  }

  constructor(@Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private dataService: LostbornService,
    private dialogRef: MatDialogRef<DialogContentComponent>,
    private snackBar: MatSnackBar) {
    this.record = data.row; // record will be the main data point & will remain untouched. 
    this.isNew = data.isNew;

    //set select vars from passed data...
    this.ipSelectOptions = data.ipSelectOptions;
    this.userSelectOptions = data.userSelectOptions;
    this.planStatusSelectOptions = data.planStatusSelectOptions;
    this.accessPageSelectOptions = data.accessPageSelectOptions;
    this.accessTypeSelectOptions = data.accessTypeSelectOptions;

    if (!this.isNew) {
      // Initialize form group with values from row..
      this.editForm = this.fb.group({

        PLAN_YEAR: [this.data.row.PLAN_YEAR],

      });
      this.setData(data);
    }
    else {
      //initialize form group with default values...
      this.editForm = this.fb.group({

        PLAN_YEAR: [this.PLAN_YEAR],

      });
      this.isEditing = true;
    }
    //set select contol from passed data...
    this.ipPlanControl.setValue(this.IP_PLAN);
    this.userTypeControl.setValue(this.OPRCLASS);
    this.planStatusControl.setValue(this.PLAN_STATUS);
    this.accessPageControl.setValue(this.ACCESS_PAGES);
    this.accessTypeControl.setValue(this.ACCESS_TYPE);
    // Subscribe to value changes of the form controls
    this.editForm.valueChanges.subscribe(() => {
      // Set isDirty to true when changes are made
      this.isDirty = true;
    });
  }

  onEdit(event: any): void {
    if (!this.isDirty) {
      this.isEditing = true;
    }
  }
  onReset(): void {
    // Reset the form controls to their initial values
    //set select contol from passed data...
    this.ipPlanControl.setValue(this.IP_PLAN);
    this.userTypeControl.setValue(this.OPRCLASS);
    this.planStatusControl.setValue(this.PLAN_STATUS);
    this.accessPageControl.setValue(this.ACCESS_PAGES);
    this.accessTypeControl.setValue(this.ACCESS_TYPE);

    //set input field to default..
    this.editForm.patchValue({ PLAN_YEAR: this.PLAN_YEAR });
    // Set isDirty to false after resetting
    this.isDirty = false;
  }
  onSave(): void {
    // Save logic...

    //get input controls...
    const id = this.ID;
    const planVal = this.ipPlanControl.value;
    const planYear = this.editForm.get('PLAN_YEAR')?.value;
    const userVal = this.userTypeControl.value;
    const statusVal = this.planStatusControl.value;
    const pageVal = this.accessPageControl.value;
    const typeVal = this.accessTypeControl.value;
    // reference select controls 
  
    if (!this.isDirty) {
      this.snackBar.open('No changes to save.', 'Close', {
        duration: 2000, // Duration in milliseconds
      });
      return;
    } else {
      // Check if the form values are different from the original values
      if (this.formValuesChanged()) {
        if (this.isNew) {
  
          let mParams = {
            IP_PLAN: planVal,
            PLAN_YEAR: planYear,
            OPRCLASS: userVal,
            PLAN_STATUS: statusVal,
            ACCESS_PAGES: pageVal,
            ACCESS_TYPE: typeVal
          }
          console.log('Create values: ', mParams);
          this.dataService.addMember(mParams).subscribe(
            (response) => {
              // Handle success
              console.log('Record created successfully:', response);
              this.isEditing = false;
              this.snackBar.open('New record added successfully!', 'Close', {
                duration: 2000,
              });
              // Close the dialog after saving
              this.dialogRef.close();
            },
            (error) => {
              // Handle error
              console.error('Error creating record:', error);
              this.snackBar.open('Failed to add new record.', 'Close', {
                duration: 2000,
              });
            }
          );
        } else {
          // Logic for updating an existing record...
          let mParams = {
            ID: id,
            IP_PLAN: planVal,
            PLAN_YEAR: planYear,
            OPRCLASS: userVal,
            PLAN_STATUS: statusVal,
            ACCESS_PAGES: pageVal,
            ACCESS_TYPE: typeVal
          }
          console.log('Update values: ', mParams);
          this.dataService.updateMember(mParams).subscribe(
            (response) => {
              // Handle success
              console.log('Record Updated successfully:', response);
              this.isEditing = false;
              this.snackBar.open('Record Updated successfully!', 'Close', {
                duration: 2000,
              });
              // Close the dialog after saving
              this.dialogRef.close();
            },
            (error) => {
              // Handle error
              console.error('Error creating record:', error);
              this.snackBar.open('Failed to add new record.', 'Close', {
                duration: 2000,
              });
            }
          );
        }
      } else {
        this.snackBar.open('No changes to save.', 'Close', {
          duration: 2000, // Duration in milliseconds
        });
        return;
      }
    }
  }  
  onSelectChanged(): void {
    this.isDirty = true;
  }
  onDelete(): void {
    // Display a success message using MatSnackBar
    this.snackBar.open('Data Deleted successfully!', 'Close', {
      duration: 2000, // Duration in milliseconds
    });

    console.log('Attempting to Delete Rec. ID:',this.ID);

    this.dataService.deleteMember(this.ID).subscribe(
      (response) => {
        // Handle success
        console.log('Record Deleted successfully:', response);
        this.isEditing = false;
        this.snackBar.open('Record Deleted successfully!', 'Close', {
          duration: 2000,
        });
        // Close the dialog after saving
        this.dialogRef.close();
      },
      (error) => {
        // Handle error
        console.error('Error Deleting record:', error);
        this.snackBar.open('Failed to Delete record.', 'Close', {
          duration: 2000,
        });
      }
    );

    // Close the dialog after saving
    this.dialogRef.close();
  }
  onGoBack(): void {
    if (this.isEditing && !this.isNew) {
      //We're attempting to go back whist editing...
      if (this.isDirty ) {
        //We've made changes, display pop up to user...
        const confirmClose = window.confirm('You have unsaved changes. Do you really want to close?');
        if (!confirmClose) {
          // Prevent the dialog from closing
          return; 
        }
        else{
          this.dialogRef.close();
        }
      }
      else { this.isEditing = false; }
    }
    else {
      //close dialogue box...
      this.dialogRef.close();
    }
  }
  // Helper function to check if the form values are different from the original values
  formValuesChanged(): boolean {
    return (
      this.ipPlanControl.value !== this.IP_PLAN ||
      this.userTypeControl.value !== this.OPRCLASS ||
      this.planStatusControl.value !== this.PLAN_STATUS ||
      this.accessPageControl.value !== this.ACCESS_PAGES ||
      this.accessTypeControl.value !== this.ACCESS_TYPE ||
      Object.keys(this.editForm.controls).some(key => this.editForm.get(key)?.value !== this.data[key])
    );
  }
}

