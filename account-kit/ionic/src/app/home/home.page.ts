import {Component} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    userInfo: any;

    constructor() {
    }

    register() {
        (<any> window).AccountKitPlugin.loginWithPhoneNumber({
            useAccessToken: true,
            defaultCountryCode: 'IN',
            facebookNotificationsEnabled: true
        }, data => {
            (<any> window).AccountKitPlugin.getAccount(
                info => this.userInfo = info);
        }, err => alert(err));
    }

}
