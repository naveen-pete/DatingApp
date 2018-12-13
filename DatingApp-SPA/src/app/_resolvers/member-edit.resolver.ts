import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from './../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id: number = +this.authService.decodedToken.nameid;
    return this.userService.getUser(id).pipe(
      catchError(error => {
        console.log('MemberEditResolver.resolve() - Error:', error);

        this.alertify.error('Problem retrieving profile data.');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
