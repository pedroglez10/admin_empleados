import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BeneficiariesService } from 'src/app/core/services/beneficiaries/beneficiaries.service';
import { Beneficiaries } from 'src/app/core/models/beneficiaries.model';

@Component({
  selector: 'app-beneficiaries-form',
  templateUrl: './beneficiaries-form.component.html',
  styleUrls: ['./beneficiaries-form.component.scss']
})
export class BeneficiariesFormComponent implements OnInit {
  form!: FormGroup;
  id_employee!: number;
  id!: number;
  new: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private alerts: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private beneficiariesService: BeneficiariesService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    // listen params from the route
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id_employee = parseInt(params['id_employee']);
      this.id = parseInt(params['id']);
      if (this.id) {
        this.beneficiariesService.getBeneficiary(this.id_employee, this.id)
        .pipe(
          catchError((err: any) => {
            return of({'success': err.error.success, 'msg':err.error.data.message});
          })
        )
        .subscribe((res: any) => {
          if (res.success) {
            this.new = false;
            this.form.patchValue(res.data); // set value to form
          }
          else {
            this.router.navigateByUrl(`beneficiaries/${this.id_employee}/create/${this.id_employee}`);
            this.alerts.open("Beneficiario no identificado, favor de agregar uno nuevo", "Cerrar");
          }
        });
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['',  Validators.required],
      relationship: ['',  Validators.required],
      birth_date: ['',  Validators.required],
      gender: ['M']
    });
  }

  submitForm(event: Event) {
    event.preventDefault(); // prevent reload the page
    const beneficiary: Beneficiaries = this.form.value;
    if (this.new) {
      this.beneficiariesService.createBeneficiary(this.id_employee, beneficiary)
      .pipe(
        catchError((err: any) => {
          return of([]);
        })
      )
      .subscribe((res: any) => {
        if(res.success) {
          this.router.navigateByUrl(`beneficiaries/${this.id_employee}`)
        }

        this.alerts.open(res.data.message, "Cerrar");
      });
    }
    else {
      this.beneficiariesService.modifyBeneficiary(this.id_employee, this.id, beneficiary)
      .pipe(
        catchError((err: any) => {
          return of([]);
        })
      )
      .subscribe((res: any) => {
        if(res.success) {
          this.router.navigateByUrl(`beneficiaries/${this.id_employee}`)
        }

        this.alerts.open(res.data.message, "Cerrar");
      });
    }
  }

  Clear() {
    this.form.reset();
    this.form.get('gender')?.setValue('M');
  }

  goBack() {
    this.location.back();
  }

}
