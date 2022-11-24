import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmployeesService } from 'src/app/core/services/employees/employees.service';
import { Employees } from 'src/app/core/models/employees.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  employees: Employees[] = [];

  constructor(
    private alerts: MatSnackBar,
    private employeesService: EmployeesService
  ) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeesService.getAllEmployees()
    .pipe(
      catchError((err: any) => {
        console.error('error', err.status, err.error.data.message)
        return of([{'success': err.error.success, 'msg':err.error.data.message}]);
      })
    )
    .subscribe((res: any) =>{
      if(res.success){
        this.employees = res.data;
      }
      else {
        this.employees = [];
      }
    })
  }

  removeEmployee(id: number) {
    this.employeesService.deleteEmployee(id)
    .pipe(
      catchError((err: any) => {
        console.error('error', err.status, err.error.data.message)
        return of([{'success': err.error.success, 'msg':err.error.data.message}]);
      })
    )
    .subscribe((res: any) =>{
      if(res.success){
        this.fetchEmployees();
        this.alerts.open(res.data.message, "Cerrar");
      }
      else
        this.alerts.open(res.msg, "Cerrar");
    });
  }  
}
