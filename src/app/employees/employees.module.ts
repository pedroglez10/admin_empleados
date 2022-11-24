import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BeneficiariesTableComponent } from './components/beneficiaries-table/beneficiaries-table.component';
import { BeneficiariesFormComponent } from './components/beneficiaries-form/beneficiaries-form.component';
import { BeneficiariesLayoutComponent } from './components/beneficiaries-layout/beneficiaries-layout.component';


@NgModule({
  declarations: [
    TableComponent,
    FormComponent,
    BeneficiariesTableComponent,
    BeneficiariesFormComponent,
    BeneficiariesLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeesRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployeesModule { }
