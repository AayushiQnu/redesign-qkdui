import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ExpandableComponent } from "../components/expandable/expandable.component";
import { AddPSKModule } from "../components/addpsk/addpsk.module";
import { AddPSK } from "../components/addpsk/addpsk.component";
import {GetAuthProviderModule} from '../services/getauth.module';
import {GetAuthProvider} from '../services/getauth';
import { FileUploadModule } from "ng2-file-upload";
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  entryComponents: [AddPSK],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPSKModule,
    GetAuthProviderModule,
    FileUploadModule,
    Ng2SearchPipeModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, ExpandableComponent],
  providers: [GetAuthProvider]
})
export class HomePageModule {}
