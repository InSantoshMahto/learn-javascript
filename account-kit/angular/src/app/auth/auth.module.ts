import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AccountKitService } from './service/account-kit/account-kit.service';
import { ContinueWithOtpComponent } from './components/continue-with-otp/continue-with-otp.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ContinueWithOtpComponent],
  imports: [CommonModule, AuthRoutingModule, HttpClientModule],
  providers: [AccountKitService],
})
export class AuthModule {}
