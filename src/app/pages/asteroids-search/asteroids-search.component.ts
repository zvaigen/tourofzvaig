import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { AsteroidsService } from 'src/app/services/asteroids.service';
import { Asteroid } from '../../models/asteroid';


@Component({
  selector: 'app-asteroids-search',
  templateUrl: './asteroids-search.component.html',
  styleUrls: ['./asteroids-search.component.scss']
})
export class AsteroidsSearchComponent implements OnInit {


  asteroids: Asteroid[] = [];
  filteredAsteroids: Asteroid[] = [];

  constructor(private asteroidsService: AsteroidsService) { }

  ngOnInit() {
  }

  getAsteroids(obj:any): void {
    if(localStorage.length > 5){
      localStorage.removeItem("date"+(localStorage.length-1));
      localStorage.setItem("date"+localStorage.length, obj.startDate +" "+ obj.endDate);
    }
    else{
      localStorage.setItem("date"+localStorage.length, obj.startDate +" "+ obj.endDate);
      this.asteroidsService.getAsteroids(obj.startDate, obj.endDate)
      .subscribe((response: any) => {
        Object.keys(response.near_earth_objects).forEach(date => this.asteroids.push(...response.near_earth_objects[date]));
        this.filteredAsteroids = _.cloneDeep(this.asteroids);
      })
    }
  }

  deleteAsteroid(asteroid: Asteroid): void {
    let AsteroidIndex = this.filteredAsteroids.indexOf(asteroid);
    this.filteredAsteroids.splice(AsteroidIndex, 1);
  }

  handleResetAction() {
    this.filteredAsteroids = this.asteroids;
  }
 
}



