import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Employee } from '../interfaces/employee';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailService {

  url: string = environment.apiBaseUrl + '/EmployeeAPI';

  list: Employee[] = [];

  formData: Employee = {} as Employee;


  constructor(private http: HttpClient) { }
  refreshList() {
    this.http.get(this.url)
      .subscribe(
        {
          next: (res) => {
            // console.log(res);
            this.list = res as Employee[];
          },
          error: (err) => {
            console.log(err);
          }
        })
  }

  PostEmployeeDetail() {
    return this.http.post(this.url, this.formData)
  }

  putEmployeeDetail() {
    return this.http.put(`${this.url}/${this.formData.empid}`, this.formData)
  }

  DeleteEmployeeDetail(id:number) {
    return this.http.delete(`${this.url}/${id}`)
  }
  resetForm(form: NgForm) {
    form.form.reset(); 
    this.formData = {
      empid:0,
      empname:'', 
      empmobile:'',
      empposition:'',
      empsalary: 0,
    };
  }
}
