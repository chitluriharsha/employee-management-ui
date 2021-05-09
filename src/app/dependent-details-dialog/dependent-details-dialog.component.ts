import { DependentDetails } from './dependent-details.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dependent-details-dialog',
  templateUrl: './dependent-details-dialog.component.html',
  styleUrls: ['./dependent-details-dialog.component.css'],
})
export class DependentDetailsDialogComponent implements OnInit {
  dependentDetailsForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DependentDetailsDialogComponent>
  ) {}

  ngOnInit(): void {
    this.dependentDetailsForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      relation: new FormControl(null, Validators.required),
    });
  }
  onAddDependent() {
    let dependentDetails: DependentDetails = new DependentDetails();
    dependentDetails.name = this.dependentDetailsForm.value.name;
    dependentDetails.dateOfBirth = this.convert(
      this.dependentDetailsForm.value.dateOfBirth
    );
    dependentDetails.relation = this.dependentDetailsForm.value.relation;
    this.dialogRef.close(dependentDetails);
    console.log(dependentDetails);
  }

  onClose() {
    this.dialogRef.close();
  }
  convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }
}
