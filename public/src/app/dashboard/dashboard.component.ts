import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }
  userList: Array<any>;//for store all user data

  ngOnInit() {
    this.dashboardService.getUserList().subscribe((response: any) => {
      this.userList = response['responseData']
    }, err => {
      
      return err;
    })
  }

}
