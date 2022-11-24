import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Beneficiaries } from '../../models/beneficiaries.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiariesService {

  constructor(
    private http: HttpClient
  ) { }

  getAllBeneficiaries(id_employee: number) {
    return this.http.get(`${environment.url_api}/employees/${id_employee}/beneficiaries`);
  }

  getBeneficiary(id_employee: number, id: number) {
    return this.http.get(`${environment.url_api}/employees/${id_employee}/beneficiaries/${id}`);
  }

  deleteBeneficiary(id_employee: number, id: number) {
    return this.http.delete(`${environment.url_api}/employees/${id_employee}/beneficiaries/${id}`);
  }

  createBeneficiary(id_employee: number, employee: Partial<Beneficiaries>) {
    return this.http.post(`${environment.url_api}/employees/${id_employee}/beneficiaries`, employee);
  }

  modifyBeneficiary(id_employee: number, id: number, employee: Partial<Beneficiaries>) {
    return this.http.put(`${environment.url_api}/employees/${id_employee}/beneficiaries/${id}`, employee);
  }
}
