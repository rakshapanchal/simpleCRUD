import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
 loginIn: any;
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('isLogIn')
  }

  ngOnInit() {
   this.loginIn = localStorage.getItem('isLogIn')
   console.log(this.loginIn)
  }
}
