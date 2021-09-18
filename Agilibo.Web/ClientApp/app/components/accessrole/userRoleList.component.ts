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
import { AccessRole, AccessMain, AccessDetail } from '../../models/AccessRole';
import { UserService } from '../../services/user.service';

export class SharedService {

}

@Component({
    selector: 'userrolelist',
    templateUrl: './userRoleList.component.html'

})
export class UserRoleListComponent implements OnInit {
    loading = false;
    model: any = {};
    currentUser: any;
    roles: AccessRole[] = [];
    menudetail: MenuClass[] = [];
    formlist: MenuDetail[] = [];
    submenu: MenuClass[] = [];
    accessMenuHeader: AccessMain[] = [];
    accessMenuFormList: AccessDetail[] = [];
    constructor(private userservice: UserService,private router: Router, private alertService: AlertService, private roleservice: AccessRoleService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.userservice.checkIfUserisLoggedIn();
    }
    getList() {

        this.roleservice.getAllRoleByCompany(this.currentUser.companyKey).subscribe(
            data => {
                this.roles = data;              
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            }
        );
    }
   
    ngOnInit(): void {
        this.getList();
    }
    public delete(obj: AccessRole) {
        var ans = confirm("Do you want to remove Role : " + obj.roleName + " from List?");
        if (ans) {
                this.roleservice.delete(obj.roleKey).subscribe((data) => {
                    this.alertService.error('Data Deleted successfully', false);
                    this.getList();
                },
               error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
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
    
    public viewDetail(id: number) {       
        //this.roleservice.getRoleDetailByRoleKey(id).subscribe((data) => {           
        //    this.model.roleName = this.roleservice.roleData.roleName;
        //    console.log(this.model.roleName);
        //    this.model.mainList = this.roleservice.roleData.mainList;
        //    this.model.detailList = this.roleservice.roleData.detailList;
        //},
        //    error => {
        //        this.alertService.error(error._body);
        //        this.loading = false;
        //    });

        this.roleservice.getMenuForAllAccessDissociatedList(id).subscribe(
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
}
