import { Routes } from '@angular/router';
import { ListingsComponent } from './listings/listings.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { ContactComponent } from './contact/contact.component';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { NewListingComponent } from './new-listing/new-listing.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listings',
    pathMatch: 'full',
  },
  {
    path: 'listings',
    component: ListingsComponent,
    title: 'Listings',
  },
  {
    path: 'listing/:id',
    component: ListingDetailComponent,
    title: 'Listing Detail',
  },
  {
    path: 'contact/:id',
    component: ContactComponent,
    title: 'Contact',
  },
  {
    path: 'my-listings',
    component: MyListingsComponent,
    title: 'My Listings',
  },
  {
    path: 'my-listing/edit/:id',
    component: EditListingComponent,
    title: 'Edit Listing',
  },
  {
    path: 'new-listing',
    component: NewListingComponent,
    title: 'New Listing',
  },
  {
    path: '**',
    redirectTo: 'listings',
    pathMatch: 'full',
  },
];
