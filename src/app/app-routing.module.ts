import { CompletedUsersComponent } from './components/completed-users/completed-users.component';
import { ManualPaymentComponent } from './components/manual-payment/manual-payment.component';
import { ActiveComponent } from './components/active/active.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { AdminguardGuard } from './auth/adminguard.guard';
import { AdminPayoutComponent } from './components/admin-payout/admin-payout.component';
import { AdminTransactionComponent } from './components/admin-transaction/admin-transaction.component';
import { AdminCashoutComponent } from './components/admin-cashout/admin-cashout.component';
import { AdminInactiveComponent } from './components/admin-inactive/admin-inactive.component';
import { CashoutComponent } from './components/cashout/cashout.component';
import { WhyitworksComponent } from './components/whyitworks/whyitworks.component';
import { FaqComponent } from './faq/faq.component';
import { UserTrasanctionsComponent } from './components/user-trasanctions/user-trasanctions.component';
import { ServicesComponent } from './services/services.component';
import { PolicyComponent } from './policy/policy.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthgaurdGuard } from './auth/authgaurd.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { TestimoniesComponent } from './testimonies/testimonies.component';
import { PaymentComponent } from './components/payment/payment.component';
import { DownlineComponent } from './components/downline/downline.component';

const routes: Routes = [
  { path: '', component: HomepageComponent},
  {path : 'login', component: LoginComponent},
{ path: 'register', component: RegisterComponent},
{ path: 'contactus', component: ContactComponent},
{ path: 'about', component: AboutComponent},
{ path: 'testimonies', component: TestimoniesComponent},
{ path: 'howitworks', component: HowitworksComponent},
{ path: 'whyitworks', component: WhyitworksComponent},
{ path: 'policy', component: PolicyComponent},
{ path: 'services', component: ServicesComponent},
{ path: 'faq-questions', component: FaqComponent},

{path: 'tabs', component: TabsComponent},
  { path: 'payment', component: PaymentComponent, canActivate:[AuthgaurdGuard]},
  { path: 'welcome', component: WelcomeComponent, canActivate:[AuthgaurdGuard]},
  { path: 'user-transactions', component: UserTrasanctionsComponent, canActivate:[AuthgaurdGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthgaurdGuard]},
  { path: 'profile', component: ProfileComponent, canActivate:[AuthgaurdGuard]},
  { path: 'cashout', component: CashoutComponent, canActivate:[AuthgaurdGuard]},
  { path: 'admin-inactive', component: AdminInactiveComponent, canActivate:[AuthgaurdGuard, AdminguardGuard]},
  { path: 'admin-active', component: ActiveComponent,canActivate:[AuthgaurdGuard, AdminguardGuard]},
  { path: 'admin-cashout', component: AdminCashoutComponent, canActivate:[AuthgaurdGuard, AdminguardGuard]},
  { path: 'admin-transaction', component: AdminTransactionComponent, canActivate:[AuthgaurdGuard, AdminguardGuard]},
  { path: 'admin-payout', component: AdminPayoutComponent, canActivate:[AuthgaurdGuard, AdminguardGuard]},
  { path: 'admin-manual-pay', component: ManualPaymentComponent, canActivate:[AuthgaurdGuard, AdminguardGuard]},
  { path: 'completed-users', component: CompletedUsersComponent, canActivate:[AuthgaurdGuard, AdminguardGuard]},
   { path: 'downline', component: DownlineComponent, canActivate:[AuthgaurdGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
