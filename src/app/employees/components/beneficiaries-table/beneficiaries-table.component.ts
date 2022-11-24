import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BeneficiariesService } from 'src/app/core/services/beneficiaries/beneficiaries.service'
import { Beneficiaries } from 'src/app/core/models/beneficiaries.model';

@Component({
  selector: 'app-beneficiaries-table',
  templateUrl: './beneficiaries-table.component.html',
  styleUrls: ['./beneficiaries-table.component.scss']
})
export class BeneficiariesTableComponent implements OnInit {
  id_employee!: number;
  beneficiaries: Beneficiaries[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alerts: MatSnackBar,
    private beneficiariesService: BeneficiariesService
  ) { }

  ngOnInit(): void {
    // listen params from the route
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id_employee = parseInt(params['id']);
      if (this.id_employee) {
        this.fetchBeneficiaries();
      }
      else
        this.router.navigateByUrl('');
    });
  }

  fetchBeneficiaries() {
    this.beneficiariesService.getAllBeneficiaries(this.id_employee)
    .pipe(
      catchError((err: any) => {
        console.error('error', err.status, err.error.data.message)
        return of({'success': err.error.success, 'msg':err.error.data.message});
      })
    )
    .subscribe((res: any) => {
      if (res.success) {
        this.beneficiaries = res.data;
      }
      else {
        this.beneficiaries = [];
      }
    });
  }

  removeBeneficiary(id: number) {
    this.beneficiariesService.deleteBeneficiary(this.id_employee, id)
    .pipe(
      catchError((err: any) => {
        console.error('error', err.status, err.error.data.message)
        return of([{'success': err.error.success, 'msg':err.error.data.message}]);
      })
    )
    .subscribe((res: any) =>{
      if(res.success){
        this.fetchBeneficiaries();
        this.alerts.open(res.data.message, "Cerrar");
      }
      else
        this.alerts.open(res.msg, "Cerrar");
    });
  }
}
