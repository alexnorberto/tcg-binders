import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment'

//Angular Material Components
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { SearchViewComponent } from './components/search-view/search-view.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MainToolBarComponent } from './design-components/main-tool-bar/main-tool-bar.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserCardsComponent } from './components/user-cards/user-cards.component';
import { UserCollectionsComponent } from './components/user-collections/user-collections.component';
import { ExpansionContainerComponent } from './design-components/expansion-container/expansion-container.component';
import { SortTableComponent } from './design-components/sort-table/sort-table.component';
import { CardCollectionControlComponent } from './design-components/card-collection-control/card-collection-control.component';
import { BinderPageComponent } from './design-components/binder-page/binder-page.component';
import { SingleCardComponent } from './design-components/single-card/single-card.component';
import { CardsCarouselComponent } from './design-components/cards-carousel/cards-carousel.component';
import { BinderBookComponent } from './design-components/binder-book/binder-book.component';
import { MainFooterComponent } from './design-components/main-footer/main-footer.component';
import { BasicContainerComponent } from './design-components/basic-container/basic-container.component';
import { CardsListComponent } from './design-components/cards-list/cards-list.component';
import { CardsSearchFormComponent } from './design-components/cards-search-form/cards-search-form.component';
//import { FirestoreTestsComponent } from './components/firestore-tests/firestore-tests.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchViewComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DashboardComponent,
    AdminDashboardComponent,
    MainToolBarComponent,
    UserInfoComponent,
    UserCardsComponent,
    UserCollectionsComponent,
    ExpansionContainerComponent,
    SortTableComponent,
    CardCollectionControlComponent,
    BinderPageComponent,
    SingleCardComponent,
    CardsCarouselComponent,
    BinderBookComponent,
    MainFooterComponent,
    BasicContainerComponent,
    CardsListComponent,
    CardsSearchFormComponent,
    //BasicContainerComponent,
    //MainFooterComponent,
    //FirestoreTestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,

    //Angular Material Components
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DragDropModule,
    //End of Angular Material Components

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
