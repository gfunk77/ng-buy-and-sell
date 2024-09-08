import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingDataFormComponent } from '../listing-data-form/listing-data-form.component';
import { Listing } from '../models/listing';
import { ListingsService } from '../listings.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-listing',
  standalone: true,
  imports: [CommonModule, ListingDataFormComponent, MatProgressSpinner],
  templateUrl: './edit-listing.component.html',
  styleUrl: './edit-listing.component.scss',
})
export class EditListingComponent implements OnInit {
  listingsService: ListingsService = inject(ListingsService);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  listing!: Listing;
  isLoading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;
    this.listingsService
      .getListing(id)
      .subscribe((listing) => (this.listing = listing));
  }

  onSubmit({
    name,
    description,
    price,
  }: {
    name: string;
    description: string;
    price: number;
  }): void {
    this.listingsService
      .editListing(this.listing.id, name, description, price)
      .subscribe(() => {
        this.router.navigate(['my-listings']);
      });
  }
}
