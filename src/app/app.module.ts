import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RestService } from './service/rest.service';

const config = {
  issuer: 'https://dev-819187.okta.com',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oa130t185HgWLidM357',
  scope: 'openid profile email'
};

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'implicit/callback', component: OktaCallbackComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    OktaAuthModule.initAuth(config)
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
