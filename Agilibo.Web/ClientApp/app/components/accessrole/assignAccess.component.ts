import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router, Event } from '@angular/router';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';


import { NgForm } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { AccessRoleService } from '../../services/accessRole/accessRole.service';
import { UserService } from '../../services/user.service';
import { UserForAssignAccess } from '../../models/UserForAssignAccess';
import { AssignAccessRoleService } from '../../services/accessRole/assignAccess.service';
import { AccessRole } from '../../models/AccessRole';
import { NavMenuComponent } from '../navmenu/navmenu.component';



@Component({
    selector: 'assignaccess',
    templateUrl: './assignAccess.component.html',
    styleUrls: ['./accessRole.component.css']
})
export class AssignAccessComponent implements OnInit {
    loading = false;
    model: any = {};

    currentUser: any;
    userlist: UserForAssignAccess[] = [];
    roleList: AccessRole[] = [];
    constructor(private userservice: UserService, private router: Router, private app: NavMenuComponent,
        private accessService: AssignAccessRoleService, private alertService: AlertService,
        private roleservice: AccessRoleService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.userservice.checkIfUserisLoggedIn();
    }
    getUserList() {
        this.accessService.getAllUserList(this.currentUser.companyKey).subscribe(
            data => {
                this.userlist = this.accessService.userlist;
                console.log(this.userlist);
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            }
        );
    }
    getRoleList() {
        this.roleservice.getAllRoleByCompany(this.currentUser.companyKey).subscribe(
            data => {
                this.roleList = data;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            }
        );
    }
    ngOnInit(): void {
        this.getRoleList();
        this.getUserList();
    }
    assign(obj: UserForAssignAccess) {
        this.model.fullName = obj.fullName;
        this.model.email = obj.email;
        this.model.userKey = obj.userKey;
        this.model.roleKey = obj.roleKey;
        this.model.roleName = obj.roleName;
    }

    public delete(obj: UserForAssignAccess) {
        var ans = confirm("Do you want to remove this role from " + obj.email  + "?");
        if (ans) {
           
            this.roleservice.removeRoleFromAccess(obj.userKey).subscribe((data) => {
                this.alertService.error('Data Deleted successfully', false);
                this.getRoleList();
                this.getUserList();
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
    }
    saveData() {
        this.model.createdBy = this.currentUser.userKey;
        this.model.modifiedBy = this.currentUser.userKey;
        this.loading = true;
        console.log(this.model);
        this.accessService.addRoleToUsers(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Data Saved successfully', false);
                    this.getRoleList();
                    this.getUserList();
                    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                    this.currentUser.roleKey = this.model.roleKey;
                    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                    this.app.checkLogin();
                    this.loading = false;
                    this.router.navigate(['/assignaccess']);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });

    }

}
