import { DependentDetailsDialogComponent } from './../dependent-details-dialog/dependent-details-dialog.component';
import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DependentDetails } from '../dependent-details-dialog/dependent-details.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css'],
})
export class InsuranceComponent implements OnInit {
  insuranceForm: FormGroup;
  dependentDetails: DependentDetails[];
  displayedColumns: string[] = ['name', 'dateOfBirth', 'relation'];
  dataSource = new MatTableDataSource();
  constructor(
    private appService: AppService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.insuranceForm = new FormGroup({
      employeeId: new FormControl(null, Validators.required),
    });
    this.dependentDetails = [];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DependentDetailsDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dependentDetails.push(result);
        this.dataSource = new MatTableDataSource<DependentDetails>(
          this.dependentDetails
        );
      }
    });
  }

  saveDetails(): void {
    let data = {
      employeeId: this.insuranceForm.value.employeeId,
      dependentDetails: this.dependentDetails,
    };
    this.appService.saveDependentDetails(data).subscribe(
      (suc) => {
        this.openSnackBar('Saved dependent details');
        this.resetDetails();
      },
      (err) => {
        this.openSnackBar('Error occured !!');
      }
    );
  }
  resetDetails(): void {
    this.insuranceForm.reset();
    this.dependentDetails = [];
    this.dataSource = new MatTableDataSource<DependentDetails>(
      this.dependentDetails
    );
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
