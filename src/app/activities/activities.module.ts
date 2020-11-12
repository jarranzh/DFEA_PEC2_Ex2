import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateActivityComponent } from './update-activity/update-activity.component';
import { MyActivitiesDetailsComponent } from './my-activities-details/my-activities-details.component';
import { MyActivitiesComponent } from './my-activities/my-activities.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewActivityComponent } from './new-activity/new-activity.component';

@NgModule({
  declarations: [
    ActivityDetailComponent,
    ActivityListComponent,
    FavoritesComponent,
    MyActivitiesComponent,
    MyActivitiesDetailsComponent,
    NewActivityComponent,
    UpdateActivityComponent,
    HomeComponent
  ],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ActivitiesModule {}
