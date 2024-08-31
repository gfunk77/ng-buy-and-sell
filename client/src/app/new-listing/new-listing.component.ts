import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-listing',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './new-listing.component.html',
  styleUrl: './new-listing.component.scss',
})
export class NewListingComponent implements OnInit {
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);

  newListingForm = this.fb.group({
    id: [null],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [null, Validators.required],
  });

  ngOnInit(): void {}

  getErrorMessage(controlName: string): string {
    return `${
      controlName.at(0)?.toUpperCase() + controlName.slice(1)
    } is required`;
  }

  onSubmit(): void {
    if (this.newListingForm.invalid) {
      return;
    }
    console.log(this.newListingForm.value);
    this.router.navigate(['/my-listings']);
  }

  goBack(): void {
    this.router.navigate(['/my-listings']);
  }
}
