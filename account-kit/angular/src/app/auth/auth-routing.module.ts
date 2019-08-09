import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContinueWithOtpComponent } from './components/continue-with-otp/continue-with-otp.component';

const routes: Routes = [
  {
    path: '',
    component: ContinueWithOtpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
