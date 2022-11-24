import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmployeesService } from 'src/app/core/services/employees/employees.service';
import { Employees } from 'src/app/core/models/employees.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  new: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private alerts: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeesService: EmployeesService
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
    // listen params from the route
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = parseInt(params['id']);
      if (this.id) {
        this.employeesService.getEmployee(this.id)
        .pipe(
          catchError((err: any) => {
            console.error('error', err.status, err.error.data.message)
            return of({'success': err.error.success, 'msg':err.error.data.message});
          })
        )
        .subscribe((res: any) => {
          if (res.success) {
            this.new = false;
            this.form.patchValue(res.data); // set value to form
          }
          else {
            this.router.navigateByUrl('create');
            this.alerts.open("Empleado no identificado, favor de agregar uno nuevo", "Cerrar");
          }
        });
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['',  Validators.required],
      role: ['',  Validators.required],
      salary: ['',  Validators.required],
      status: ['1'],
      hire_date: ['',  Validators.required]
    });
  }

  submitForm(event: Event) {
    event.preventDefault(); // prevent reload the page
    const employee: Employees = this.form.value;
    if (this.new) {
      this.employeesService.createEmployee(employee)
      .pipe(
        catchError((err: any) => {
          console.error('error', err)
          return of([]);
        })
      )
      .subscribe((res: any) => {
        if(res.success) {
          this.router.navigateByUrl('')
        }

        this.alerts.open(res.data.message, "Cerrar");
      });
    }
    else {
      this.employeesService.modifyEmployee(this.id, employee)
      .pipe(
        catchError((err: any) => {
          console.error('error', err)
          return of([]);
        })
      )
      .subscribe((res: any) => {
        if(res.success) {
          this.router.navigateByUrl('')
        }

        this.alerts.open(res.data.message, "Cerrar");
      });
    }
  }

  Clear() {
    this.form.reset();
    this.form.get('status')?.setValue('1');
  }
}
