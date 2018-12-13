import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from '../../_models/user';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification(event: any) {
    if (this.editForm.dirty) {
      event.returnValue = true;
    }
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }

  updateUser() {
    const id = this.authService.decodedToken.nameid;
    this.userService.updateUser(id, this.user).subscribe(
      user => {
        this.alertify.success('Profile saved successfully!');
        this.editForm.reset(this.user);
        console.log(user);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

}
