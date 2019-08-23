import { RouterModule } from '@angular/router';
import { AuthgaurdGuard } from './auth/authgaurd.guard';
// built-in import
import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesModule } from 'angular2-flash-messages';




// component imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesComponent } from './services/services.component';
import { TestimoniesComponent } from './testimonies/testimonies.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { PolicyComponent } from './policy/policy.component';
import { SideNavComponent } from './src/app/dashboard/side-nav/side-nav.component';
import { MarketerRegComponent } from './marketer-reg/marketer-reg.component';
import { UserTrasanctionsComponent } from './components/user-trasanctions/user-trasanctions.component';
import { CounterComponent } from './components/counter/counter.component';
import { FaqComponent } from './faq/faq.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AccountComponent } from './components/account/account.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { WhyitworksComponent } from './components/whyitworks/whyitworks.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    DashboardComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    ContactComponent,
    AboutComponent,
    ServicesComponent,
    TestimoniesComponent,
    HowitworksComponent,
    PolicyComponent,
    SideNavComponent,
    MarketerRegComponent,
    UserTrasanctionsComponent,
    CounterComponent,
    FaqComponent,
    PaymentComponent,
    AccountComponent,
    WhyitworksComponent,
    AdmindashboardComponent,
    SidemenuComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,



],
schemas: [NO_ERRORS_SCHEMA],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
     UserService, AuthgaurdGuard, NgbModalConfig, NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
