import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router, Event } from '@angular/router';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';

import { MenuDetail } from '../../models/MenuHeader';
import { MenuClass, CreateRoleClass } from '../../models/MenuClass';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { AccessRoleService } from '../../services/accessRole/accessRole.service';
import { UserService } from '../../services/user.service';

export class SharedService {

}

@Component({
    selector: 'accessrole',
    templateUrl: './accessRole.component.html',
    styleUrls: ['./accessRole.component.css']
})
export class AccessRoleComponent implements OnInit {
    loading = false;
    menustring: string = "";
    model: any = {};
    user: any = [];
    currentUser: any;
    mainmenu: MenuClass[] = [];
    formlist: MenuDetail[] = [];
    subheader: MenuClass[] = [];
    constructor(private userservice: UserService, private router: Router, private alertService: AlertService,
        private roleservice: AccessRoleService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.userservice.checkIfUserisLoggedIn();
    }
    getList() {

        this.roleservice.getMenuForAllAccess().subscribe(
            data => {
                this.formlist = data.formList;
                this.mainmenu = data.mainMenuList;
                this.subheader = data.subheaderList;
                console.log(data.formList);
                console.log(this.mainmenu);
                console.log(this.subheader);
                for (var i = 0; i < this.formlist.length; i++) {
                    this.formlist[i].selected = false;
                }
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            }
        );
    }
    filterforms(key: number, type: number) {
        return this.formlist.filter(x => x.menuKey == key && x.descendLevel == type);
    }
    filtersubmenu(key: number, h: number) {
        return this.subheader.filter(x => x.menuKey == key && x.hierarchy == h);
    }


    addRole(e: any, role: string) {
        if (e.target.checked) {
            if (!(this.user.indexOf(role) > -1)) var length = this.user.push(role);
        }
        if (e.target.checked == false) {

            var index = this.user.indexOf(role, 0);
            if (index > -1) {
                this.user.splice(index, 1);
            }

        }

    }
    ngOnInit(): void {

        this.getList();
    }
    selectAll(e: any) {
        if (e.target.checked) {
            for (var i = 0; i < this.formlist.length; i++) {
                this.formlist[i].selected = true;
                var length = this.user.push(this.formlist[i]);
            }
        }
        else {
            for (var i = 0; i < this.formlist.length; i++) {
                this.formlist[i].selected = false;
                var index = this.user.indexOf(this.formlist[i], 0);
                if (index > -1) {
                    this.user.splice(index, 1);
                }
            }
        }

    }

    modelToSave: CreateRoleClass | undefined;
    submit() {
        if (this.user.length > 0) {
            this.model.roles = this.user;
            console.log(this.model);
            this.model.companyKey = this.currentUser.companyKey;
            this.model.createdBy = this.currentUser.userKey;
            this.model.modifiedBy = this.currentUser.userKey;
            this.loading = true;
            console.log(this.model);
            this.roleservice.addNewRole(this.model)
                .subscribe(
                    data => {
                        this.alertService.success('Data Saved successfully', false);
                        this.getList();
                        this.model.roleName = "";

                        this.loading = false;
                        this.router.navigate(['/userrolelist']);
                    },
                    error => {
                        this.alertService.error(error._body);
                        this.loading = false;
                    });
        }
        else {
            this.alertService.warning('Please select from forms below', false);
        }


    }

}
