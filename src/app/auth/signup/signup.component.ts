import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  profileForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onSubmit(){
    const email = this.profileForm.value.email;
    const password = this.profileForm.value.password;
    try {
      await this.authService.signup( email, password )
      this.router.navigate( [ '/asteroids-search' ] );
    } catch (error) {
      console.log( error.message );
    }
  }

  
  
}
