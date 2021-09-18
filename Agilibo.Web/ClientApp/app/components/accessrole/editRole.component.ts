import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router, Event, ActivatedRoute } from '@angular/router';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';

import { MenuDetail } from '../../models/MenuHeader';
import { MenuClass, CreateRoleClass } from '../../models/MenuClass';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { AccessRoleService } from '../../services/accessRole/accessRole.service';
import { AccessRole, AccessMain, AccessDetail } from '../../models/AccessRole';
import { UserService } from '../../services/user.service';



@Component({
    selector: 'editRole',
    templateUrl: './editRole.component.html',
    styleUrls: ['./accessRole.component.css']

})
export class EditRoleComponent implements OnInit {
    loading = false;
    model: any = {};
    user: any = [];
    currentUser: any;
    menudetail: MenuClass[] = [];
    formlist: MenuDetail[] = [];
    submenu: MenuClass[] = [];

    accessMenuHeader: AccessMain[] = [];
    accessMenuFormList: AccessDetail[] = [];

    id: number = 0;
    constructor(private _avRoute: ActivatedRoute, private userservice: UserService,
        private router: Router, private alertService: AlertService, private roleservice: AccessRoleService) {

        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
        }
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.userservice.checkIfUserisLoggedIn();
    }
    filterforms(key: number, type: number) {
        return this.formlist.filter(x => x.menuKey == key && x.descendLevel == type);
    }
    filtersubmenu(key: number, h: number) {
        return this.submenu.filter(x => x.menuKey == key && x.hierarchy == h);
    }
    filterformsR(key: number, type: number) {
        return this.accessMenuFormList.filter(x => x.menuKey == key && x.hierarchy == type);
    }
    filtersubmenuR(key: number, h: number) {
        return this.accessMenuHeader.filter(x => x.mainMenuKey == key && x.hierarchy == h);
    }
    filterMainR() {
        return this.accessMenuHeader.filter(x => x.hierarchy == 0);
    }
    getList() {

        this.roleservice.getMenuForAllAccessDissociatedList(this.id).subscribe(
            data => {
                this.accessMenuHeader = data.accessMenuHeader;
                this.accessMenuFormList = data.accessMenuFormList;

                this.formlist = data.formList;
                this.menudetail = data.mainMenuList;
                this.submenu = data.subheaderList;
                console.log(this.menudetail);
                for (var i = 0; i < this.formlist.length; i++) {
                    this.formlist[i].selected = false;
                }

                this.model.roleKey = data.roleKey;
                this.model.roleName = data.roleName;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            }
        );
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
    public delete(obj: AccessDetail) {
        var ans = confirm("Do you want to remove : " + obj.title + " from List?");
        if (ans) {
            console.log(obj.pKey);
            this.roleservice.deleteSingleForm(obj.pKey).subscribe((data) => {
                this.alertService.error('Data Deleted successfully', false);
                this.getList();
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
    }
    public deleteMain(obj: AccessMain) {
        var ans = confirm("Do you want to remove : " + obj.title + " from List?");
        if (ans) {
          
            this.roleservice.deleteAccessMainAndAccessDetailByAccessKey(obj.accessKey).subscribe((data) => {
                this.alertService.error('Data Deleted successfully', false);
                this.getList();
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
    }
    submit() {
        if (this.user.length > 0) {
            this.model.roles = this.user;
            console.log(this.model);
            this.loading = true;
            this.model.createdBy = this.currentUser.userKey;
            this.model.modifiedBy = this.currentUser.userKey;
            this.loading = true;
            console.log(this.model);
            this.roleservice.updateNewRole(this.model)
                .subscribe(
                    data => {
                        this.alertService.success('Data Saved successfully', false);
                        this.getList();
                        this.model.roleName = "";
                        this.user = [];
                        this.loading = false;
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
