import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GetAuthProvider } from './getauth';
import { HttpClientModule } from  '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
  ]
  //declarations: [GetAuthProvider]
})
export class GetAuthProviderModule {}
