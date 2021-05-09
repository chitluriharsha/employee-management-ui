import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: FormGroup;
  constructor(private appService: AppService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.addEmployeeForm = new FormGroup({
      employeeId: new FormControl(null, Validators.required),
      employeeName: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      designation: new FormControl(null, Validators.required),
      dateOfJoining: new FormControl(null, Validators.required),
      workLocation: new FormControl(null, Validators.required),
      contactNo: new FormControl(null, [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      emailId: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onAddEmployee(): void {
    this.addEmployeeForm.patchValue({
      dateOfBirth: this.convert(this.addEmployeeForm.get('dateOfBirth').value),
      dateOfJoining: this.convert(
        this.addEmployeeForm.get('dateOfJoining').value
      ),
    });
    this.appService
      .saveNewEmployeeDetails(this.addEmployeeForm.value)
      .subscribe(
        (suc) => {
          this.openSnackBar('Added employee succussfully');
          this.resetDetails();
        },
        (err) => {
          this.openSnackBar('Error occured !!');
        }
      );
  }

  convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  resetDetails(): void {
    this.addEmployeeForm.reset();
    this.addEmployeeForm.patchValue({
      dateOfBirth: '',
      dateOfJoining: '',
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
