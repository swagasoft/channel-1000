import { AdminguardGuard } from './auth/adminguard.guard';
import { AdminLevel4Component } from './components/admin-level4/admin-level4.component';
import { AdminLevel3Component } from './components/admin-level3/admin-level3.component';
import { AdminLevel2Component } from './components/admin-level2/admin-level2.component';
import { AdminLevel1Component } from './components/admin-level1/admin-level1.component';
import { AdminPayoutComponent } from './components/admin-payout/admin-payout.component';
import { AdminAccountComponent } from './components/admin-search/admin-search.component';
import { AdminTransactionComponent } from './components/admin-transaction/admin-transaction.component';
import { AdminCashoutComponent } from './components/admin-cashout/admin-cashout.component';
import { AdminInactiveComponent } from './components/admin-inactive/admin-inactive.component';
import { AdminInvestorsComponent } from './components/admin-investors/admin-investors.component';
import { CashoutComponent } from './components/cashout/cashout.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { WhyitworksComponent } from './components/whyitworks/whyitworks.component';
import { AccountComponent } from './components/account/account.component';
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
import { RewardsComponent } from './components/rewards/rewards.component';
import { ReferandearnComponent } from './components/referandearn/referandearn.component';
import { UserReferalComponent } from './components/user-referal/user-referal.component';

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
{ path: 'link/:username', component: UserReferalComponent},
{ path: 'services', component: ServicesComponent},
{ path: 'faq-questions', component: FaqComponent},

{ path: 'account', component: AccountComponent, canActivate:[AuthgaurdGuard]},
{ path: 'payment', component: PaymentComponent, canActivate:[AuthgaurdGuard]},
{ path: 'rewards', component: RewardsComponent, canActivate:[AuthgaurdGuard]},
{ path: 'referandearn', component: ReferandearnComponent, canActivate:[AuthgaurdGuard]},
{ path: 'welcome', component: WelcomeComponent, canActivate:[AuthgaurdGuard]},
{ path: 'user-transactions', component: UserTrasanctionsComponent, canActivate:[AuthgaurdGuard]},
{ path: 'dashboard', component: DashboardComponent, canActivate:[AuthgaurdGuard]},
{ path: 'profile', component: ProfileComponent, canActivate:[AuthgaurdGuard]},
{ path: 'cashout', component: CashoutComponent, canActivate:[AuthgaurdGuard]},

{ path: 'admin-dash', component: AdmindashboardComponent,
canActivate:[AuthgaurdGuard, AdminguardGuard]},
{ path: 'admin-investors', component: AdminInvestorsComponent,
 canActivate:[AuthgaurdGuard, AdminguardGuard]},
{ path: 'admin-inactive', component: AdminInactiveComponent,
canActivate:[AuthgaurdGuard, AdminguardGuard]},
{ path: 'admin-cashout', component: AdminCashoutComponent,
 canActivate:[AuthgaurdGuard, AdminguardGuard]},
{ path: 'admin-transaction', component: AdminTransactionComponent,
 canActivate:[AuthgaurdGuard, AdminguardGuard]},
{ path: 'admin-search-user', component: AdminAccountComponent,
 canActivate:[AuthgaurdGuard, AdminguardGuard]},
{ path: 'admin-payout', component: AdminPayoutComponent,
 canActivate:[AuthgaurdGuard, AdminguardGuard]},
{ path: 'admin-level1', component: AdminLevel1Component,
 canActivate:[AuthgaurdGuard, AdminguardGuard]},
{ path: 'admin-level2', component: AdminLevel2Component,
canActivate:[AuthgaurdGuard, AdminguardGuard]},
{ path: 'admin-level3', component: AdminLevel3Component,
canActivate:[AuthgaurdGuard, AdminguardGuard]},
{ path: 'admin-level4', component: AdminLevel4Component,
 canActivate:[AuthgaurdGuard, AdminguardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
