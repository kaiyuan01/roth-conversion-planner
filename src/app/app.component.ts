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

  myForm : FormGroup = new FormGroup({
    bal: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });;

  ngOnInit() {
    this.myForm = new FormGroup({
      bal: new FormControl('', Validators.required),
      return: new FormControl('', [Validators.required]),
      age: new FormControl('', Validators.required),
      
      income: new FormControl('', [Validators.required]),
      deductible: new FormControl('', [Validators.required]),
      conversion: new FormControl('', Validators.required),
      taxableIncome: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
    // You can add code here to submit the form data to a server or do something else with it
  }

}
