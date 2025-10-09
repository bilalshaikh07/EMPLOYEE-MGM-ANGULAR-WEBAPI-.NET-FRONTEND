import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './app-head&foot/header/header.component';
import { EmployeeDetailComponent } from "./employee-detail/employee-detail.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    HeaderComponent, 
    EmployeeDetailComponent,

  ] ,
 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
