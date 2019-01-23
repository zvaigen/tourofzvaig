import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CountriestableComponent } from '../countriestable/countriestable.component';
import { Asteroid } from 'src/app/models/asteroid';

@Component({
  selector: 'app-asteroid-info-model',
  templateUrl: './asteroid-info-model.component.html',
  styleUrls: ['./asteroid-info-model.component.scss']
})
export class AsteroidInfoModelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CountriestableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Asteroid) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
