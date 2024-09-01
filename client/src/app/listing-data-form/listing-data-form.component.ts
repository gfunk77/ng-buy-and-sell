import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  Output,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Listing } from '../models/listing';

@Component({
  selector: 'app-listing-data-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './listing-data-form.component.html',
  styleUrl: './listing-data-form.component.scss',
})
export class ListingDataFormComponent {
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  @Input() listing: Listing | undefined;
  submit = output<Listing>();

  dataForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    if (this.listing) {
      this.dataForm.patchValue(this.listing);
    }
  }

  getErrorMessage(controlName: string): string {
    if (this.dataForm.get(controlName)?.hasError('min')) {
      return `${controlName} must be greater than 0`;
    }
    return `${
      controlName.at(0)?.toUpperCase() + controlName.slice(1)
    } is required`;
  }

  onSubmit(): void {
    if (this.dataForm.invalid) {
      return;
    }
    const formValue = this.dataForm.value;
    this.submit.emit({
      ...formValue,
      id: formValue.id || 0,
      name: formValue.name ?? '',
      description: formValue.description ?? '',
      price: formValue.price ?? 0,
    });
  }

  goBack(): void {
    this.router.navigate(['/my-listings']);
  }
}
