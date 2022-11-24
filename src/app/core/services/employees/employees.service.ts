import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Employees } from '../../models/employees.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private http: HttpClient
  ) { }

  getAllEmployees() {
    return this.http.get(`${environment.url_api}/employees`);
  }

  getEmployee(id: number) {
    return this.http.get(`${environment.url_api}/employees/${id}`);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${environment.url_api}/employees/${id}`);
  }

  createEmployee(employee: Partial<Employees>) {
    return this.http.post(`${environment.url_api}/employees`, employee);
  }

  modifyEmployee(id: number, employee: Partial<Employees>) {
    return this.http.put(`${environment.url_api}/employees/${id}`, employee);
  }
}
