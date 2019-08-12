import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SignupService } from './signup.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form1: FormGroup;
  submitted = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private signup1: SignupService,
    private toastService: ToastrService) { }

  ngOnInit() {
    this.form1 = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      gender: ['', Validators.required],
      contactNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-z])(?=.*[0-9])(?=.*[@#$_-])\S{8,20}$/)]]
    });
  }

  get f() {
    return this.form1.controls;
  }

  onSubmit() {
    this.submitted = true;

    /**if form invalid return value */
    if (this.form1.invalid) {
      return;
    }

    this.signup1.signup(this.form1.value).subscribe((data: any) => {
      if (data['responseCode'] == 201) {
        this.router.navigate(['/signin']);
        this.toastService.success(data.responseMessage)
      } else {
        this.toastService.error(data.responseMessage)
        return;
      }
    }, err => {
      console.log(err)
    })
  }


}
