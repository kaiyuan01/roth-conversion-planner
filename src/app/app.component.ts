import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule} from '@angular/forms';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {MatTableModule} from '@angular/material/table';

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
  總稅額: number;
}

let ELEMENT_DATA: ColData[] = [
  
  {year: 2024, age: 78, bal: 20.1797, income: 23000, ded: 0,
    conversion: 0,
    taxableIncome: 0,
    rmdFactor: 0,
    rmdAmt: 0,
    taxBracket1: 0,
    taxBracket2: 0,
    總稅額: 0,
   },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent implements OnInit  {
 // @Input() columns: [] = []; //TableHeader
 // @Input() data: [] | null = [];

  displayedColumns: string[] = ['year', 'age', 'bal', 'income', 'ded',
    'conversion',
    'taxableIncome',
    'rmdFactor',
    'rmdAmt',
    'taxBracket1',
    'taxBracket2','總稅額'];

  dataSource = ELEMENT_DATA;
  
  title = 'Roth Conversion Planner';

  INIT_DED = '29,200';
  INIT_BAL = '1042697.98';
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
      age: new FormControl('', Validators.required),
      
      income: new FormControl(this.INIT_INC, [Validators.required]),
      deductible: new FormControl(this.INIT_DED, [Validators.required]),
      conversion: new FormControl('', Validators.required),
      taxableIncome: new FormControl('', Validators.required),
      taxBracket: new FormControl(this.INIT_TB, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
    if(this.myForm && this.myForm.get('taxBracket') && this.myForm.get('taxBracket')?.value == "22%") {
      this.myForm.get("taxableIncome")?.setValue( '201050' );

      console.log( 'taxableIncome: ', this.myForm.get('taxableIncome')?.value );
      console.log( 'income: ', parseInt(this.myForm.get("income")?.value.replace(/,/g, ''), 10) );

      let conversion = this.myForm.get('taxableIncome')?.value 
        - parseInt(this.myForm.get("income")?.value.replace(/,/g, ''), 10)  
        + parseInt(this.myForm.get("deductible")?.value.replace(/,/g, ''), 10);
      console.log("conversion: ", conversion);

      this.myForm.get("conversion")?.setValue( conversion );
      
      // populate table data
      //this.columns = ['a','b'];
      //this.data = ['1','2'];      
    }
  }


}
