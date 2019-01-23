import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async signin() {
		const email = this.loginForm.value.email;
		const password = this.loginForm.value.password;
		try {
			await this.authService.signin( email, password );
			this.router.navigate( [ '/asteroids-search' ] );
		} catch (error) {
			alert( error.message );
		}
	}

  signinWithGoogle(){
     this.authService.signinGoogle();
  }
}
