import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
/*export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private storage: Storage
              ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    let authenticated = true;

    this.storage.get('usermeta').then((value) => {
      if(value.hasOwnProperty('auth')) {
        console.log(value.auth);
        if(value.auth == true) {
          authenticated = true;
        } else {
          authenticated = false;
        }
      } else {
        authenticated = false;
      }
    })


      if (!authenticated) {
        this.router.navigate(["login"]);
        return false;
      }

      return true;

  }

}*/



export class AuthGuard implements CanActivate {

constructor(private router: Router, 
            private storage: Storage) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<any> | Promise<any> {
    let authenticated = false;
    return new Promise((resolve) => {
      this.storage.ready().then(() => {
        this.storage.get('usermeta').then((value) => {
          if(value.hasOwnProperty('auth')) {
            if(value.auth == true) {
              authenticated = true;
            } else {
              authenticated = false;
            }
          } else {
            authenticated = false;
          }
          if (authenticated) {
            resolve(true);
          } else {
            this.router.navigate(['/login']);
            resolve(false);
          }
        })
      });
    });
  }
}
