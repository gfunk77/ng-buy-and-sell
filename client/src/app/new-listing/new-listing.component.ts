import { Component, inject } from '@angular/core';
import { ListingDataFormComponent } from '../listing-data-form/listing-data-form.component';
import { Listing } from '../models/listing';
import { Router } from '@angular/router';
import { ListingsService } from '../listings.service';

interface ListingFormData {
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-new-listing',
  standalone: true,
  imports: [ListingDataFormComponent],
  templateUrl: './new-listing.component.html',
  styleUrl: './new-listing.component.scss',
})
export class NewListingComponent {
  listingsService = inject(ListingsService);
  router: Router = inject(Router);

  onSubmit({ name, description, price }: ListingFormData): void {
    this.listingsService
      .createListing(name, description, price)
      .subscribe(() => {
        this.router.navigate(['my-listings']);
      });
  }
}
