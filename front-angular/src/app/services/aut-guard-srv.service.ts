import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutGuardService implements CanActivate {

  constructor(
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //throw new Error('Method not implemented.');
    if (sessionStorage.length > 0) {
      const retorno = sessionStorage.getItem('token');
      if (retorno) {
        return true;
      } else {
        return false;
      }
    } else {
      this.router.navigateByUrl('');
      return false;
    }
  }
}
