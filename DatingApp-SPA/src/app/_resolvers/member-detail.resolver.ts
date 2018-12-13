import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from './../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id: number = +route.paramMap.get('id');
    return this.userService.getUser(id).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving user data.');
        console.log('MemberDetailResolver.resolve() - Error:', error);
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
