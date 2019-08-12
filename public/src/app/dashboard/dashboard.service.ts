import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token')
  })

}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }

  getUserList() {
    return this.http.get("http://localhost:6501/user/getUserList", httpOptions)
  }
}
