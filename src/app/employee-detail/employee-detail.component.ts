import { Component, inject, OnInit } from '@angular/core';
import { EmployeeDetailFormComponent } from "./employee-detail-form/employee-detail-form.component";
import { EmployeeDetailService } from '../shared/employee-detail.service';
import { NgFor, NgIf } from '@angular/common';
import { Employee } from '../interfaces/employee';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-detail',
  imports: [EmployeeDetailFormComponent , NgFor , NgIf],
  standalone:true,
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit {
  private service = inject(EmployeeDetailService); 
  toastr = inject(ToastrService); 
  ngOnInit(){
    this.service.refreshList(); 
  }
  get employeeList() {
    return this.service.list ?? [];
  }

    public trackByIndex(index: number, item: any): number {
    return index;
  }
  popatedform(emp:Employee){
      this.service.formData = Object.assign({}, emp) ; 
  }

  onEmployeeSaved(){
    this.service.refreshList(); // reload data 
  }
  OnDelete(id:number){
    if(confirm("are you sure to delete this record ")){

    
    this.service.DeleteEmployeeDetail(id)
    .subscribe({
      next: (res) => {
        this.service.list = res as Employee[]
        // this.toastr.show('Record Deleted...!!')
        this.toastr.error(' deleted  employee record successfully !!');
        this.service.refreshList(); // ✅ REFRESH THE DATA AFTER INSERT
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  }
}
