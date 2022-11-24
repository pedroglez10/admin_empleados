import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';
import { BeneficiariesLayoutComponent } from './components/beneficiaries-layout/beneficiaries-layout.component';
import { BeneficiariesTableComponent } from './components/beneficiaries-table/beneficiaries-table.component';
import { BeneficiariesFormComponent } from './components/beneficiaries-form/beneficiaries-form.component';

const routes: Routes = [
    {
        path: '',
        component: TableComponent
    },
    {
      path: 'create',
      component: FormComponent
    },
    {
      path: 'edit/:id',
      component: FormComponent
    },
    {
      path: 'beneficiaries/:id',
      component: BeneficiariesLayoutComponent,
      children: [
        {
          path: '',
          component: BeneficiariesTableComponent
        },
        {
          path: 'create/:id_employee',
          component: BeneficiariesFormComponent
        },
        {
          path: 'edit/:id_employee/:id',
          component: BeneficiariesFormComponent
        }
      ]
    }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class EmployeesRoutingModule { }