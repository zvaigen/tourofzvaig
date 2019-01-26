import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';


export interface Searches {
  position: number;
  searchParameters: string;
  searchDate: string;
}

@Component({
  selector: 'app-last-searches',
  templateUrl: './last-searches.component.html',
  styleUrls: ['./last-searches.component.scss']
})

export class LastSearchesComponent implements OnInit {
  
  displayedColumns: string[] = ['position', 'searchParameters', 'searchDate'];
  searchData: MatTableDataSource<Searches>;
  
  @ViewChild('paginator') paginator: MatPaginator;


  constructor() {
    const searches = this.getLastSearches();
    this.searchData = new MatTableDataSource<Searches>(searches);
   }
  
  ngOnInit() {
    // this.searchData = this.getLastSearches();
    this.searchData.paginator = this.paginator;

  }
  
  getLastSearches(): Searches[] {
    var arrayOfValues = Object.keys(localStorage).filter(key => key.match(/date[0-9]/)).map(key => localStorage.getItem(key));
    console.log(arrayOfValues)
    return arrayOfValues.map<Searches>((val, i) => {
      return {
        position: i+1,
        searchParameters: val,
        searchDate: "now"
      }
    })    
  }  
}

// const SEARCHES_DATA: Searches[] = [
//   {position: 1, searchParameters: 'Hydrogen', searchDate: 1.0079},
//   {position: 2, searchParameters: 'Helium', searchDate: 4.0026},
//   {position: 3, searchParameters: 'Lithium', searchDate: 6.941},
//   {position: 4, searchParameters: 'Beryllium', searchDate: 9.0122},
//   {position: 5, searchParameters: 'Boron', searchDate: 10.811},
//   {position: 6, searchParameters: 'Carbon', searchDate: 12.0107},
//   {position: 7, searchParameters: 'Nitrogen', searchDate: 14.0067},
//   {position: 8, searchParameters: 'Oxygen', searchDate: 15.9994},
//   {position: 9, searchParameters: 'Fluorine', searchDate: 18.9984},
//   {position: 10, searchParameters: 'Neon', searchDate: 20.1797},
// ];