import { Component, inject } from '@angular/core';
import { EmployeeDetailService } from '../../shared/employee-detail.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Employee } from '../../interfaces/employee';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-detail-form',
  standalone:true, 
  imports: [FormsModule],
  templateUrl: './employee-detail-form.component.html',
  styleUrl: './employee-detail-form.component.scss'
})
export class EmployeeDetailFormComponent {
   service = inject(EmployeeDetailService); 
   toastr = inject(ToastrService); 
  

ngOnInit(){
 
}
onSubmit(form: NgForm) {
  if(form.invalid){
      form.control.markAllAsTouched(); 
      return; 
  }
  if(!this.service.formData.empid){
    this.insertRecord(form); 
  
  }else{
    this.updateRecord(form); 
  }


}

insertRecord(form:NgForm){
  this.service.PostEmployeeDetail()
    .subscribe({
      next: (res) => {
        this.toastr.success('✅ Data saved', 'Success');
        this.service.resetForm(form);
        this.service.refreshList(); // ✅ REFRESH THE DATA AFTER INSERT
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('❌ Failed to save employee', 'Error');
      }
    });
}
updateRecord(form:NgForm){
      this.service.putEmployeeDetail()
    .subscribe({
      next: (res) => {
        this.toastr.info('✅ Data Updated', 'Success');
        this.service.resetForm(form);
        this.service.refreshList(); // ✅ REFRESH THE DATA AFTER INSERT
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('❌ Failed to update employee', 'Error');
      }
    });
}

}
