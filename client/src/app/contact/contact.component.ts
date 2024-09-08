import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '../models/listing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  listingService = inject(ListingsService);

  listing!: Listing;

  contactForm = this.fb.group({
    name: [
      '',
      {
        validators: [Validators.required],
        updateOn: 'blur',
      },
    ],
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      },
    ],
    message: [''],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // const item = fakeData.find((item) => item.id === id);
    // if (item) {
    //   this.listing = item;
    //   this.contactForm.patchValue({
    //     message: `Hi, I'm interested in your ${item.name}`,
    //   });
    // }
    if (!id) return;
    this.listingService.getListing(id).subscribe((listing) => {
      this.listing = listing;
      this.contactForm.patchValue({
        message: `Hi, I'm interested in your ${listing.name}`,
      });
    });
  }

  getErrorMessage(controlName: string) {
    if (this.contactForm.get(controlName)?.hasError('required')) {
      return `${
        controlName.at(0)?.toUpperCase() + controlName.slice(1)
      } is required`;
    }

    return this.contactForm.get(controlName)?.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  clearError(controlName: string): void {
    const control = this.contactForm.get(controlName);
    if (control?.touched && control?.invalid) {
      control.markAsUntouched();
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.router.navigate(['/']);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
