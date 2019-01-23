import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User = new User();
  userProfileForm: FormGroup;
  // errors: Object = {};
  isSubmitting = false;
  $currUser: Observable<User>;

  constructor(private fb: FormBuilder, private authService: AuthService ) {
   }

   createForm(){
    this.userProfileForm = this.fb.group({
      firstName: ['', Validators.required], 
      lastName: ['', Validators.required], 
      adress: ['', Validators.required], 
      israeiliID: ['', Validators.required],
      birthdate: ['', Validators.required],
      phone: ['', Validators.required, Validators.minLength(9)],
      profilepicture: ['', Validators.required]
  
    });
   }

  ngOnInit() {
    this.createForm();
    this.$currUser = this.authService.getUser();
    // Make a copy of the current user's object to place in form fields
    (<any>Object).assign(this.user, this.$currUser);
     this.userProfileForm.patchValue(this.user);
    console.log(this.user);
    debugger
  }

  onSubmit(){

  }

}
