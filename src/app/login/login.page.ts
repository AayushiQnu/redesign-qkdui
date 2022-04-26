import { Component } from '@angular/core';
import {GetAuthProvider} from '../services/getauth';
import { Router } from '@angular/router';
import CryptoJS from 'crypto-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  creds: any;
  userrole = "xgd876qsdtwe";
  userid: any;
  password: any;
  passhash: any;

  versionnum = "V0.1.2"

  constructor(
  	public authprovider: GetAuthProvider,
    public router: Router,
    private http: HttpClient,
    private storage: Storage,
    private alertController: AlertController
  ) { }

  doauth() {
    this.passhash = CryptoJS.SHA512(this.password).toString();

    console.log(this.passhash);

    if((this.userid == "admin") || (this.userid == "operator") || (this.userid == "cryptoofficer") || (this.userid == "superqunuadmin")) { 
    	// this.authprovider.getuserauth(this.userid, this.passhash).subscribe((res) => {
        this.creds = {"Status":"SUCCESS","UserRole":"admin","Userid":"admin","Passhash":"71365baada94bf4324e6bdd2429b420b46e3accbfb5718e05f8325ccc1b83d733fad89c21b13642443249af1f259d46fb78acad940c0bc19e7026f39094b1c50","BootTime":1650221999,"LocalTime":1650278653}
        // this.creds = res;
        console.log(this.creds.LocalTime)
        if(this.creds.hasOwnProperty("Status") && (this.creds.Status == "SUCCESS")) {
          this.storage.set('usermeta', {
            "userid": this.userid,
            "passhash": this.passhash,
            "role": this.creds.UserRole,
            "auth": true,
            "boottime": this.creds.BootTime,
            "currenttime": this.creds.LocalTime
          }).then(function (next) {
            this.userid = null;
            this.password = null;
            this.router.navigate(['/home/', this.creds.UserRole]);
          }.bind(this));
        } else {
          this.storage.set('usermeta', {
            "userid": "",
            "passhash": "",
            "role": "",
            "auth": false,
            "boottime": this.creds.BootTime,
            "currenttime": this.creds.LocalTime
          }).then(function (next) {
            this.presentAlert("Invalid password entered")
          }.bind(this));
        }
      // });
    } else {
      console.log("not reached admin")
      this.presentAlert("Invalid userid entered")
    }

  //  this.storage.set('usermeta', {
  //     "userid": "admin",
  //     "passhash": "",
  //     "role": "admin",
  //     "auth": true
  //   }).then(function (next) {
  //     this.router.navigate(['/home/', this.userrole]);
  //   }.bind(this));
  }


 async presentAlert(message) {
  let alert = await this.alertController.create({
    header: 'Oops',
    message: message,
    buttons: ['Ok']
  });
  await alert.present();
}


}
