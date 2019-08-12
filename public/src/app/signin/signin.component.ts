import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SigninService } from './signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form1: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    public login1: SigninService,
    private router: Router,
    private toastService: ToastrService) { }

  ngOnInit() {
    this.form1 = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-z])(?=.*[0-9])(?=.*[@#$_-])\S{8,20}$/)]]
    });

  }


  get f() { return this.form1.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form1.invalid) {
      return;
    }

    this.login1.login(this.form1.value).subscribe((data: any) => {
      if (data["responseCode"] == 200) {
        localStorage.setItem("token", data.responseData.jwt)
        localStorage.setItem('isLogIn', 'true')
        this.toastService.success(data.responseMessage)
        this.router.navigate(['/dashboard']);
      } else {
        this.toastService.error(data.responseMessage)
      }
    }
      , err => console.log("err", err))
  }

}




