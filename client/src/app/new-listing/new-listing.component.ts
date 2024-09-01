import { Component, inject } from '@angular/core';
import { ListingDataFormComponent } from '../listing-data-form/listing-data-form.component';
import { Listing } from '../models/listing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-listing',
  standalone: true,
  imports: [ListingDataFormComponent],
  templateUrl: './new-listing.component.html',
  styleUrl: './new-listing.component.scss',
})
export class NewListingComponent {
  router: Router = inject(Router);

  onSubmit(listing: Listing): void {
    console.log(listing);
    this.router.navigate(['my-listings']);
  }
}
