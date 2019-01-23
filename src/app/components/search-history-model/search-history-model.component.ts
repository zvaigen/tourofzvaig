import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainNavComponent } from '../main-nav/main-nav.component';


@Component({
  selector: 'app-search-history-model',
  templateUrl: './search-history-model.component.html',
  styleUrls: ['./search-history-model.component.scss']
})
export class SearchHistoryModelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MainNavComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
