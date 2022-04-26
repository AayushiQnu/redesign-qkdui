import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { HttpClientModule } from  '@angular/common/http';
import {GetAuthProviderModule} from '../services/getauth.module';
import {GetAuthProvider} from '../services/getauth';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    GetAuthProviderModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginPage
      }
    ])
  ],
  declarations: [LoginPage],
  providers: [GetAuthProvider]
})
export class LoginPageModule {}
