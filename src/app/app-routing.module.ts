import { ServicesComponent } from './services/services.component';
import { MarketerRegComponent } from './marketer-reg/marketer-reg.component';
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

const routes: Routes = [
  { path: '', component: HomepageComponent},
  {path : 'login', component: LoginComponent},
{ path: 'register', component: RegisterComponent},
{ path: 'contactus', component: ContactComponent},
{ path: 'about', component: AboutComponent},
{ path: 'testimonies', component: TestimoniesComponent},
{ path: 'howitworks', component: HowitworksComponent},
{ path: 'policy', component: PolicyComponent},
{ path: 'marketer-reg', component: MarketerRegComponent},
{ path: 'services', component: ServicesComponent},

{ path: 'welcome', component: WelcomeComponent, canActivate:[AuthgaurdGuard]},
{ path: 'dashboard', component: DashboardComponent, canActivate:[AuthgaurdGuard]},
{ path: 'profile', component: ProfileComponent, canActivate:[AuthgaurdGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
