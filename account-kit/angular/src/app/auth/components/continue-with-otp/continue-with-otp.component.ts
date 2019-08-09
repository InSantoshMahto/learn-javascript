import { Component, OnInit } from '@angular/core';
import { AccountKit, AuthResponse } from 'ng2-account-kit';
import { AccountKitService } from '../../service/account-kit/account-kit.service';

@Component({
  selector: 'app-continue-with-otp',
  templateUrl: './continue-with-otp.component.html',
  styleUrls: ['./continue-with-otp.component.scss'],
})
export class ContinueWithOtpComponent implements OnInit {
  appId: string;
  appCsrf: string;
  appVersion: string;

  constructor(public accountKitService: AccountKitService) {}

  ngOnInit() {
    this.initializeAccountKitCredentials();
  }

  initializeAccountKitCredentials() {
    this.accountKitService.getAccountKitCredential().subscribe(
      res => {
        console.log(res);
        this.appId = res[`appId`];
        this.appCsrf = res[`csrf`];
        this.appVersion = res[`version`];
        this.initializeAccountKit();
      },
      err => {
        console.error(err);
      }
    );
  }

  initializeAccountKit() {
    console.log('initializing account kit');
    AccountKit.init({
      appId: this.appId,
      state: this.appCsrf,
      version: this.appVersion,
    });
  }

  login(): void {
    AccountKit.login('PHONE', {
      countryCode: '+91',
      phoneNumber: '7788006653',
    }).then(
      (response: AuthResponse) => {
        console.log(response);
        this.accountKitService
          .verifyAccountKit({ code: response.code, csrf: response.state })
          .subscribe(
            res => {
              console.log(
                `console logs: ContinueWithOtpComponent -> constructor -> res`,
                res
              );
            },
            err => {
              console.log(
                `console logs: ContinueWithOtpComponent -> constructor -> err`,
                err
              );
            }
          );
      },
      (error: any) => console.error(error)
    );
  }
}
