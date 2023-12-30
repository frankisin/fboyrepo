import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { LostbornService } from '../../services/lostborn.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-dialog-product-content',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTabsModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductContentComponent {
  @Input() _data: any; // Input property to receive the data
  editForm!: FormGroup;

  record: any = []; //data we're passing thru.
  isEditing: boolean = false;
  isDirty: boolean = false;
  isNew: boolean = false;
  canDelete: boolean = true;

  ID = 0;
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

  // Create a function to set values based on incoming data
  setData(data: any): void {
    this.ID = data.row.ID || 0;
    this.title = data.row.Title || '';
    this.weight = data.row.Weight || '';
    this.description = data.row.Description || '';
    this.price = data.row.Price || 0;
    this.imageUrl = data.row.ImageUrl || '';
    this.prodFrag = data.row.ProdFrag || [];
    this.prodStatus = data.row.ProdStatus || [];
    this.descriptionLong = data.row.DescriptionLong || '';
    this.inStock = data.row.InStock || 0;
    this.averageRating = data.row.AverageRating || 0;
    this.imageUrlDetail = data.row.ImageUrlDetail || '';
  }
  // Update the setData function to set initial values in the "General" tab
  setFormData(data: any): void {
    this.ID = data.row.ID || 0;
    // Set initial values for the "General" tab
    this.editForm.patchValue({
      title: data.row.Title || '',
      weight: data.row.Weight || '',
      description: data.row.Description || '',
      price: data.row.Price || 0,
      prodFrag: data.row.ProdFrag || '',
      descriptionLong: data.row.DescriptionLong || '',
      inStock: data.row.InStock || 0,
      averageRating: data.row.AverageRating || 0,
      imageUrl: data.row.ImageUrl || '',
      imageUrlDetail: data.row.ImageUrlDetail || ''
    });

    // Set initial values for other properties as needed
    // ...
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataService: LostbornService,
    private dialogRef: MatDialogRef<ProductContentComponent>,
    private snackBar: MatSnackBar
  ) {
    this.record = data.row; // record will be the main data point & will remain untouched.
    this.isNew = data.isNew;

    console.log('Initialized data: ', data.row);

    //set select vars from passed data...

    if (!this.isNew) {

      // Initialize form group with values from row..
      this.setData(data);

    } else {
      //initialize form group with default values...

      this.isEditing = true;
    }

    // Initialize the form group using FormBuilder
    this.editForm = this.fb.group({

      title: [this.title, Validators.required], // Add validation if needed
      weight: [this.weight],
      description: [this.description],
      price: [this.price],
      imageUrl: [this.imageUrl],
      prodFrag: [this.prodFrag],
      descriptionLong: [this.descriptionLong],
      inStock: [this.inStock],
      averageRating: [this.averageRating],
      imageUrlDetail: [this.imageUrlDetail],
      // Add other form controls here
    });



    // Subscribe to value changes of the form controls
    /*this.editForm.valueChanges.subscribe(() => {
      // Set isDirty to true when changes are made
      this.isDirty = true;
    });*/
  }

  onSave(): void {
    // Save logic...

    //get ID & form data...
    const id = this.ID;
    const formData = {
      title: this.editForm.get('title')?.value,
      weight: this.editForm.get('weight')?.value,
      description: this.editForm.get('description')?.value,
      price: this.editForm.get('price')?.value,
      imageUrl: this.editForm.get('imageUrl')?.value,
      prodFrag: this.editForm.get('prodFrag')?.value,
      descriptionLong: this.editForm.get('descriptionLong')?.value,
      inStock: this.editForm.get('inStock')?.value,
      averageRating: this.editForm.get('averageRating')?.value,
      imageUrlDetail: this.editForm.get('imageUrlDetail')?.value,
    };

    console.log(formData);

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

          console.log('Create values: ', formData);
          this.dataService.addProductData(formData).subscribe(
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
            ID: id
          }
          mParams = { ...mParams, ...formData };
          console.log('Update values: ', mParams);
          this.dataService.updateProductData(mParams).subscribe(
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
  onChanged(): void {
    this.isDirty = true;
  }
  onGoBack(): void {
    if (this.isEditing && !this.isNew) {
      //We're attempting to go back whist editing...
      if (this.isDirty) {
        //We've made changes, display pop up to user...
        const confirmClose = window.confirm('You have unsaved changes. Do you really want to close?');
        if (!confirmClose) {
          // Prevent the dialog from closing
          return;
        }
        else {
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
  onDelete(): void {
    // Display a success message using MatSnackBar
    this.snackBar.open('Data Deleted successfully!', 'Close', {
      duration: 2000, // Duration in milliseconds
    });

    console.log('Attempting to Delete Product with Rec. ID:', this.ID);

    this.dataService.deleteProductData(this.ID).subscribe(
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
  onReset(): void {
    // Reset the form controls to their initial values

    // Set isDirty to false after resetting
    this.isDirty = false;
  }
  onEdit(event: any): void {
    if (!this.isDirty) {
      this.isEditing = true;
    }
  }

  // Helper function to check if the form values are different from the original values
  formValuesChanged(): boolean {
    const formControls = this.editForm.controls;
    console.log(formControls);

    return Object.keys(formControls).some(
      (key) => {
        const formControlValue = formControls[key]?.value;
        const recordValue = this.record[key];

        // Check for null or undefined values
        const isDifferent = formControlValue !== recordValue;

        // Add additional conditions if needed
        console.log(`Did ${key} change?`, isDifferent);
        return isDifferent;
      }
    );
  }
}
