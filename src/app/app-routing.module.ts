import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from "./components/search/search.component";
import {HomeComponent} from "./components/home/home.component";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {VerifyEmailComponent} from "./components/verify-email/verify-email.component";
import {AuthGuard} from "./services/auth.guard";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {SortTableComponent} from "./design-components/sort-table/sort-table.component";
import {UserCardsComponent} from "./components/user-cards/user-cards.component";
import {UserCollectionsComponent} from "./components/user-collections/user-collections.component";
import {FirestoreTestsComponent} from "./components/firestore-tests/firestore-tests.component";

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "admin", component: AdminDashboardComponent, canActivate: [AuthGuard]},
  {path: "cards", component: UserCardsComponent},
  {path: "collections", component: UserCollectionsComponent},
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  {path: "forgot-password", component: ForgotPasswordComponent},
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "search", component: SearchComponent},
  {path: "signup", component: SignupComponent},
  {path: "verify-email", component: VerifyEmailComponent},

  {path: "fire", component: FirestoreTestsComponent},

  {path: "table", component: SortTableComponent},
  {path: "**", component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
