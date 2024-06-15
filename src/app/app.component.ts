import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule} from '@angular/forms';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {MatTableModule} from '@angular/material/table';
import { TableDataService } from './services/table-data.service';
import { RMD_MAP } from './app.constants';
import Utils from './app.utils';
import { MyCurrencyPipe } from './pipes/currency.pipe'
import { formatDate, CurrencyPipe } from '@angular/common';
import { environment } from './../environments/environment';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from '@angular/common';

export interface ColData {
  year: number;
  age: number;
  bal: number;
  income: number;
  ded: number;
  conversion: number;
  taxableIncome: number;
  rmdFactor: number;
  rmdAmt: number;
  taxBracket1: number;
  taxBracket2: number;
  taxBracket3: number;
  tax: number;
  balAftTax: number;
}

export interface ColDataSummary {
  info: string;
  at85: string;
  at100: string;
  at120: string;
}

let ELEMENT_DATA: ColData[] = [
  {year: 2024, age: 50, bal: 900000, income: 23000, ded: 29200,
    conversion: 0,
    taxableIncome: 0,
    rmdFactor: 0,
    rmdAmt: 0,
    taxBracket1: 0,
    taxBracket2: 0,
    taxBracket3: 0,
    tax: 0,
    balAftTax: 0,
   },
];

let ELEMENT_DATA_SUMMARY: ColDataSummary[] = [
  {info: '', at85: '', at100: '', at120: '',}];
   
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatTableModule, 
    //BrowserModule, 
    CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[TableDataService]
})


export class AppComponent implements OnInit  {
 // @Input() columns: [] = []; //TableHeader
 // @Input() data: [] | null = [];
 @HostBinding('attr.app-version') appVersionAttr = environment.appVersion;

  // status 
  filingStatuses: any = [ 'Single', 'Married Filing Jointly', ];

  dataSummary: ColDataSummary[] = ELEMENT_DATA_SUMMARY;
  newSummary: ColDataSummary = {info: '', at85: '', at100: '', at120: '',};
  constructor(private myService: TableDataService) {
    this.dataSummary = myService.getSummary();
  }
  addItem() {
    this.myService.addSummary(this.newSummary);
    //this.newItem = '';
  }

  displayedColumns: string[] = ['year', 'age', 'bal', 'income', 'ded',
    'conversion',
    'taxableIncome',
    'rmdFactor',
    'rmdAmt',
    'taxBracket1', 'taxBracket2','taxBracket3','tax', 'balAftTax'];

  displayedColumnsSummary: string[] = ['info', 'at85', 'at100', 'at120',];
  dataSource = ELEMENT_DATA;
  summary = ELEMENT_DATA_SUMMARY; //this.myService.getSummary(); //this.dataSummary; //ELEMENT_DATA_SUMMARY;
  
  title = 'Roth Conversion Planner';

  INIT_DED = '29,200';
  INIT_BAL = '1000000';
  INIT_RET = '10%';
  INIT_INC = '16,338';
  INIT_TB = '22%';


  myForm : FormGroup = new FormGroup({
    bal: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });;

  ngOnInit() {
    this.myForm = new FormGroup({
      bal: new FormControl(this.INIT_BAL, Validators.required),
      return: new FormControl(this.INIT_RET, [Validators.required]),
      statusSelected: new FormControl('Married Filing Jointly', [Validators.required]),
      age: new FormControl('', Validators.required),
      age2convert: new FormControl('62', Validators.required),
      
      income: new FormControl(this.INIT_INC, [Validators.required]),
      deductible: new FormControl(this.INIT_DED, [Validators.required]),
      conversion: new FormControl('', Validators.required),
      taxableIncome: new FormControl('', Validators.required),
      taxableIncome2: new FormControl('', Validators.required),
      taxBracket: new FormControl(this.INIT_TB, Validators.required),
    });
  }

  changeFilingStatus(e: any) {
    console.log('status selected: ', e.value);
    this.myForm.setValue(e.target.value, {
      onlySelf: true
    })
  }

  // Getter method to access formcontrols
  get filingStatus() {
    return this.myForm.get('statusSelected');
  }

  onSubmit() {
    console.log(this.myForm.value);
    if(this.myForm && this.myForm.get('taxBracket') && this.myForm.get('taxBracket')?.value >= "22%") {
      if(this.myForm.get('taxBracket')?.value == "22%") this.myForm.get("taxableIncome")?.setValue( '201050' );
      else if (this.myForm.get('taxBracket')?.value == "24%") this.myForm.get("taxableIncome")?.setValue( '383900' );

      if(this.myForm.get('statusSelected')?.value == "Single") { // default MFJ
        console.log( 'Processing status: Single ... taxableIncome upper limit: 單身是：22% 100525 24% 191950。' );
        if(this.myForm.get('taxBracket')?.value == "22%") this.myForm.get("taxableIncome")?.setValue( '100525' );
        else if (this.myForm.get('taxBracket')?.value == "24%") this.myForm.get("taxableIncome")?.setValue( '191950' );
      }

      console.log( 'taxableIncome: ', this.myForm.get('taxableIncome')?.value );
      console.log( 'income: ', parseInt(this.myForm.get("income")?.value.replace(/,/g, ''), 10) );

      let conversion = this.myForm.get('taxableIncome')?.value 
        - parseInt(this.myForm.get("income")?.value.replace(/,/g, ''), 10)  
        + parseInt(this.myForm.get("deductible")?.value.replace(/,/g, ''), 10);
      console.log("conversion: ", conversion);

      this.myForm.get("conversion")?.setValue( conversion );
      
      // populate table data
      this.dataSource = [];
      this.summary = [];

      /* let row =
        {year: 2024, age: 56, bal: 1042697, income: 23000, ded: 0,
          conversion: 0, taxableIncome: 0,
          rmdFactor: 0, rmdAmt: 0,
          taxBracket1: 0, taxBracket2: 0, tax: 0
         };   
      this.dataSource.push(row);
      */

      let counter = 1;

      let age = parseInt(this.myForm.get("age")?.value.replace(/,/g, ''), 10);
      let age2convert = parseInt(this.myForm.get("age2convert")?.value.replace(/,/g, ''), 10);

      let year = (new Date()).getFullYear();
      let bal = parseFloat(this.myForm.get("bal")?.value.replace(/,/g, ''));
      let ret = parseFloat(this.myForm.get("return")?.value.replace(/,/g, '')) / 100;
      let ded = parseFloat(this.myForm.get("deductible")?.value.replace(/,/g, ''));
      let taxableIncome = parseFloat(this.myForm.get("taxableIncome")?.value.replace(/,/g, ''));
      let income = parseFloat(this.myForm.get("income")?.value.replace(/,/g, ''));
      let tax1 = 2320.0, tax2 = 8532.0, tax3 = 23485;
      let tax = tax1 + tax2 + tax3;
      //conversion = taxableIncome-income+ded;

      let taxTot = tax;
      if(this.summary.at(0)?.info === '') {
        //this.summary = [];
      }

      let rowSummary = 
      {
        info: 'Starting with $' + bal +' at ' + age + '; start converting to Roth at age ' + age2convert,
        at85: '0',
        at100: '0',
        at120: '0',
      };   

      let row =
         {year: year, age: age, bal: bal, income: income, ded: ded,
          conversion: conversion, taxableIncome: taxableIncome,
          rmdFactor: 0, rmdAmt: 0,
          taxBracket1: tax1, taxBracket2: tax2, taxBracket3: tax3, tax: tax, balAftTax: conversion-tax
         };   

      if(age < age2convert) {
          row['conversion'] = 0;
          row['taxBracket1'] = 0;
          row['taxBracket2'] = 0;
          row['taxBracket3'] = 0;
          row['tax'] = 0;
          row['balAftTax'] = 0;
          //row['bal'] = row['bal'] * (1 + ret);
       }
       
      this.dataSource.push(row);

      while (age < 120) {
        //console.log(counter);
        age++;
        year++;

        bal = row['bal'];
        //console.log('ret=', ret, ', bal=',bal);
        taxableIncome = row['taxableIncome']; // taxable income last year
        income = row['income'];
        ded = row['ded'];
        conversion = row['conversion'];
        let conversion2 = taxableIncome-income+ded;

        let balAftTax = row['balAftTax'];

        let bal2 =  bal * (1 + ret) - conversion2;

        let rmdFactor = 0, rmdAmt = 0;

        let bal_final = bal2 >=0 ? bal2 : 0;
        if(age >= 76 && bal_final > 0 && bal-conversion > 0) {
          rmdFactor = RMD_MAP.get(age);
          rmdAmt = bal_final/rmdFactor;
          //console.log('rmdAmt: ', rmdAmt);
          //row['rmdFactor'] = rmdFactor;
          //row['rmdAmt'] = rmdAmt;

          if(rmdAmt > conversion2 ) {
            conversion2 = rmdAmt;
          }
         }

        if ( conversion-bal == 0 ) { // last time: last conversion
          bal_final = 0;
        }

        row = 
        {year: year, age: age, bal: bal_final, income: income, ded: ded,
          conversion: conversion2, taxableIncome: taxableIncome,
          rmdFactor: rmdFactor, rmdAmt: rmdAmt,
          taxBracket1: tax1, taxBracket2: tax2, taxBracket3: tax3, tax: tax1+tax2+tax3,
          balAftTax: balAftTax*(1+ret) + conversion2 - tax,
         };   

         if(age >= age2convert && row['conversion'] > row['bal']) {
          row['conversion'] = row['bal']; // last conversion
          row['taxableIncome'] = row['conversion'] + row['income'] - row['ded'] ;
         }
         //recalc tax based on taxable income; 35% max for now
         let tax_final = Utils.calcTax(row['taxableIncome']);
          if ( tax_final !== undefined) {
            row['tax'] = tax_final; // 35% max for now, only show 3 tax brackets in ui
          }

         if(bal2 <= 0 || bal ==0) {
            row['taxBracket1'] = 0;
            row['taxBracket2'] = 0;
            row['taxBracket3'] = 0;
            row['tax'] = 0;
            
            if (bal ==0 || (bal-conversion) <=0 ) { // last year's conversion amt
              // prev/orig bal is 0, account has no bal left
              row['conversion'] = 0;
              row['bal'] = 0;
              row['balAftTax'] = balAftTax * (1 + ret);
            }
         }
         if(age < age2convert) {
            row['conversion'] = 0;
            row['taxBracket1'] = 0;
            row['taxBracket2'] = 0;
            row['taxBracket3'] = 0;
            row['tax'] = 0;
            row['balAftTax'] = 0;
            row['bal'] = bal * (1 + ret);
         }
         /*else if(age == age2convert) {
            row['bal'] = bal * (1 + ret);
         }*/

         //console.log('In RMD_MAP: ', RMD_MAP);
         // forEach method receives a callback as first parameter, and this callback could receive three parameters: currentValue, index, array, in this order.
         // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
         RMD_MAP.forEach((value, key) => {
          //console.log('k:',key, ', v:', value);
         }); 

         if(row['conversion'] == 0 && row['bal'] == 0) {
          row['taxableIncome'] = 0;
          row['taxBracket1'] = 0;
          row['taxBracket2'] = 0;
          row['taxBracket3'] = 0;
         }

         if(row['rmdFactor'] > 0 && row['conversion'] >= row['rmdAmt'] ) {
          if(row['conversion'] > row['rmdAmt'] ) row['conversion'] = row['rmdAmt'];
          row['taxableIncome'] = row['conversion'] + row['income'] - row['ded'];
         } 

         this.dataSource.push(row);
         taxTot += row['tax'];

         if(age == 85) {
            rowSummary['at85'] = 'balAftTax: ' + (row['balAftTax'].toLocaleString('en-US', { style: 'currency', currency: 'USD',maximumFractionDigits: 2 }));
         }
         else if(age == 100) {
            rowSummary['at100'] = 'balAftTax: ' + row['balAftTax'].toLocaleString('en-US', { style: 'currency', currency: 'USD',maximumFractionDigits: 2 }).toString();
         }
         else if(age == 120) {
            rowSummary['at120'] = 'balAftTax: ' + row['balAftTax'].toLocaleString('en-US', { style: 'currency', currency: 'USD',maximumFractionDigits: 2 }).toString() +
                                  '\nAllTaxPaid: ' + taxTot;
            this.myService.addSummary(rowSummary);
            //this.dataSummary.push(rowSummary);
            //this.summary = this.myService.getSummary();
            this.summary.push(rowSummary);
            //this.summary.push(rowSummary);

            //this.dataSummary.push(rowSummary);
            console.log('this.dataSummary: ', this.dataSummary);
            //console.log('this.dataSource: ', this.dataSource);
            this.summary = [];
            // clone the array
            this.dataSummary.forEach(val => this.summary.push(Object.assign({}, val)));
            console.log('this.summary: ', this.summary);
         }

         counter++;
      }
    }

    // if the data in the table got changed
    if(1  && this.myForm && this.myForm.get('taxableIncome2')?.dirty ) {
      console.log( 'taxableIncome2: ', this.myForm.get('taxableIncome2')?.value );
      //this.myForm.get("taxableIncome")?.setValue( '999' );

      this.myForm.get("taxableIncome")?.setValue( this.myForm.get('taxableIncome2')?.value );
    }
  }


}
