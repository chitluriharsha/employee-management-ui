import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient) {}

  saveNewEmployeeDetails(employeeDetails) {
    return this.http.post(
      'http://localhost:8080/saveEmployeeInfo',
      employeeDetails
    );
  }

  saveDependentDetails(dependentDetails) {
    return this.http.post(
      'http://localhost:8081/saveAndNotifyDependentDetails',
      dependentDetails
    );
  }
}
