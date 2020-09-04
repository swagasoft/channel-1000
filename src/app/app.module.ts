import { ActiveComponent } from './components/active/active.component';
import { MaterialModule } from './modules/material/material.module';
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
import { Angular4PaystackModule } from 'angular4-paystack';




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
import { UserTrasanctionsComponent } from './components/user-trasanctions/user-trasanctions.component';
import { CounterComponent } from './components/counter/counter.component';
import { FaqComponent } from './faq/faq.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { WhyitworksComponent } from './components/whyitworks/whyitworks.component';
import { CashoutComponent } from './components/cashout/cashout.component';
import { AdminInactiveComponent } from './components/admin-inactive/admin-inactive.component';
import { AdminCashoutComponent } from './components/admin-cashout/admin-cashout.component';
import { AdminTransactionComponent } from './components/admin-transaction/admin-transaction.component';
import { AdminPayoutComponent } from './components/admin-payout/admin-payout.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './components/tabs/tabs.component';
import { LogedinNavComponent } from './components/logedin-nav/logedin-nav.component';
import { DownlineComponent } from './components/downline/downline.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ManualPaymentComponent } from './components/manual-payment/manual-payment.component';
import { CompletedUsersComponent } from './components/completed-users/completed-users.component';
import { LostPasswordComponent } from './components/lost-password/lost-password.component';



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
    UserTrasanctionsComponent,
    CounterComponent,
    FaqComponent,
    PaymentComponent,
    WhyitworksComponent,
    CashoutComponent,
    AdminInactiveComponent,
    ActiveComponent,
    AdminCashoutComponent,
    AdminTransactionComponent,
    AdminPayoutComponent,
    ForgetPasswordComponent,
    TabsComponent,
    LogedinNavComponent,
    LogedinNavComponent,
    DownlineComponent,
    EditProfileComponent,
    ManualPaymentComponent,
    CompletedUsersComponent,
    LostPasswordComponent

  ],
  entryComponents:[EditProfileComponent, LostPasswordComponent],
  imports: [
    BrowserModule,
    NgbModule,
    IonicModule,
    MaterialModule,
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
    Angular4PaystackModule,
    IonicModule.forRoot()



],
schemas: [NO_ERRORS_SCHEMA],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
     UserService, AuthgaurdGuard, NgbModalConfig, NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
