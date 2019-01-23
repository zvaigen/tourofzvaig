import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import * as moment from 'moment';
import { debug } from 'util';



@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {
  
  public searchValue : string;

  @Output() searchAction = new EventEmitter();
  @Output() resetAction = new EventEmitter();
  @Output() searchAsteroidAction = new EventEmitter();

  profileForm = this.fb.group({
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    console.log(this.profileForm.value);
    this.searchAction.emit(this.profileForm.value);
  }

  onChange(){
    
    this.searchAsteroidAction.emit(this.searchValue); 
   }

   formatDate(input: string, event: any){
     this.profileForm.controls[input].setValue(moment(event.value).format("YYYY-MM-DD"));
   }

   resetAsteroids( ){
     this.resetAction.emit()
   }


  ngOnInit() {
  
  }

  
  



}
