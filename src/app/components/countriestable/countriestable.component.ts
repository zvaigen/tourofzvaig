import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Asteroid } from '../../models/asteroid';
import { MatDialog } from '@angular/material';
import { AsteroidInfoModelComponent } from '../asteroid-info-model/asteroid-info-model.component';



@Component({
  selector: 'app-countriestable',
  templateUrl: './countriestable.component.html',
  styleUrls: ['./countriestable.component.scss']
})
export class CountriestableComponent implements OnInit {

  
  @Input() asteroids: Asteroid[] = [];
  @Output() removeAsteroidAction = new EventEmitter();
  // @ViewChild('paginator') paginator: MatPaginator;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }


  deleteAsteroid(asteroid: Asteroid){
    this.removeAsteroidAction.emit(asteroid);
    
  }

  
  openDialog(asteroid: Asteroid): void {
    const dialogRef = this.dialog.open(AsteroidInfoModelComponent, {
      width: '350px',
      height: '350px',
      data: asteroid
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }


 
}
