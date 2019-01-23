import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TourOfZvaig';

  constructor(){
    firebase.initializeApp({
      apiKey: "AIzaSyBYsYud8il5AiK9eZunKQdo-8qJh5P65wk",
      authDomain: "fir-skills-70d4c.firebaseapp.com",
      databaseURL: "https://fir-skills-70d4c.firebaseio.com",
      projectId: "fir-skills-70d4c",
    });
    
  }
  

  ngOnInit() {
  }
}
