import { Injectable } from '@angular/core';

export interface ColDataSummary {
  info: string;
  at80: string;
  at100: string;
  at120: string;
}
let ELEMENT_DATA_SUMMARY: ColDataSummary[] = [
  {info: '', at80: '', at100: '', at120: '',}];

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  private summary : ColDataSummary[] = []; //ELEMENT_DATA_SUMMARY;

  //private summary: string[] = [];
  getSummary(): ColDataSummary[] {
    return this.summary;
  }
  addSummary(newData: ColDataSummary) {
    this.summary.push(newData);
  }
  
  constructor() { }
}
