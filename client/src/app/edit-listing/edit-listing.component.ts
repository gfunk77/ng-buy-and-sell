import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { fakeData } from '../fakeData';

@Component({
  selector: 'app-edit-listing',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit-listing.component.html',
  styleUrl: './edit-listing.component.scss',
})
export class EditListingComponent {
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  editListingForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const listing = fakeData.find((listing) => listing.id === id);
    if (listing) {
      this.editListingForm.patchValue(listing);
    }
  }

  getErrorMessage(controlName: string): string {
    return `${
      controlName.at(0)?.toUpperCase() + controlName.slice(1)
    } is required`;
  }

  onSubmit(): void {
    if (this.editListingForm.invalid) {
      return;
    }
    console.log(this.editListingForm.value);
    this.router.navigate(['/my-listings']);
  }

  goBack(): void {
    this.router.navigate(['/my-listings']);
  }
}
