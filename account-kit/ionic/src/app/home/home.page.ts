import { Component } from '@angular/core';

declare var AccountKitPlugin;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userInfo: any;

  constructor() {}

  register() {
    console.log(AccountKitPlugin);
    AccountKitPlugin.loginWithPhoneNumber(
      {
        useAccessToken: true,
        defaultCountryCode: 'IN',
        facebookNotificationsEnabled: true,
      },
      data => {
        AccountKitPlugin.getAccount(
          info => (this.userInfo = info)
        );
      },
      err => alert(err)
    );
  }
}
