import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit  {
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
    // You can add code here to submit the form data to a server or do something else with it

    if(this.myForm && this.myForm.get('taxBracket') && this.myForm.get('taxBracket')?.value == "22%") {
      this.myForm.get("taxableIncome")?.setValue( '201050' );
      this.myForm.get("conversion")?.setValue( eval( this.myForm.get("taxableIncome")?.value - this.myForm.get("income")?.value + this.myForm.get("deductible")?.value ) );
    }
  }

}
