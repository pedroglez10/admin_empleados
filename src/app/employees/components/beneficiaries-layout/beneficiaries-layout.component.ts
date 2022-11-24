import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmployeesService } from 'src/app/core/services/employees/employees.service';
import { Employees } from 'src/app/core/models/employees.model';

@Component({
  selector: 'app-beneficiaries-layout',
  templateUrl: './beneficiaries-layout.component.html',
  styleUrls: ['./beneficiaries-layout.component.scss']
})
export class BeneficiariesLayoutComponent implements OnInit {
  id_employee!: number;
  employee!: Employees;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alerts: MatSnackBar,
    private employeesService: EmployeesService
  ) { }

  ngOnInit(): void {
    // listen params from the route
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id_employee = parseInt(params['id']);
      if (this.id_employee) {
        this.employeesService.getEmployee(this.id_employee)
        .pipe(
          catchError((err: any) => {
            console.error('error', err.status, err.error.data.message)
            return of({'success': err.error.success, 'msg':err.error.data.message});
          })
        )
        .subscribe((res: any) => {
          if (res.success) {
            this.employee = res.data;
          }
          else {
            this.router.navigateByUrl('');
            this.alerts.open("Empleado no identificado, favor de seleccionar alguno de la lista.", "Cerrar");
          }
        });
      }
      else
        this.router.navigateByUrl('');
    });
  }

}
