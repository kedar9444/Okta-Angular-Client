import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { RestService } from './service/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isAuthenticated: boolean;
  public serverAuthData: any;
  public serverPublicData: any;

  constructor(public oktaAuth: OktaAuthService, private rest: RestService) {
    this.oktaAuth.isAuthenticated().then(result => {
      this.isAuthenticated = result;
    });

    // subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated)
    );
  }

  async getAuthData() {
    const accessToken = await this.oktaAuth.getIdToken();

    this.rest.get('/values/getb', accessToken).subscribe(data => {
      this.serverAuthData = data;
    });
  }

  getPublicData() {
    this.rest.get('/values/geta').subscribe(data => {
      this.serverPublicData = data;
    });
  }

}
