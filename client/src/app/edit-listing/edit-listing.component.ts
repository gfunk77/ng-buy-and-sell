import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fakeData } from '../fakeData';
import { ListingDataFormComponent } from '../listing-data-form/listing-data-form.component';
import { Listing } from '../models/listing';

@Component({
  selector: 'app-edit-listing',
  standalone: true,
  imports: [CommonModule, ListingDataFormComponent],
  templateUrl: './edit-listing.component.html',
  styleUrl: './edit-listing.component.scss',
})
export class EditListingComponent implements OnInit {
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  listing!: Listing;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const listing = fakeData.find((listing) => listing.id === id);
    if (listing) {
      this.listing = listing;
    }
  }

  onSubmit(listing: Listing): void {
    console.log(listing);
    this.router.navigate(['my-listings']);
  }
}
