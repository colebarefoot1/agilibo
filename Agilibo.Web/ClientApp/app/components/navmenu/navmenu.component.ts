import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { NavigationService } from '../../services/naviagtion/navigation.service';
import { MenuDetail, MenuHeader } from '../../models/MenuHeader';
import { MenuClass, SubMenu } from '../../models/MenuClass';
import { NgForm } from '@angular/forms';
import { AccessRoleService } from '../../services/accessRole/accessRole.service';
import { AccessMain, AccessDetail } from '../../models/AccessRole';
import { DisposeTokenHelper } from "../../services/tokenHelper";
import { AlertService } from '../../services/alert.service';
import { AppComponent } from '../app/app.component';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit {
   
    public navStateSource = new Subject<any>();
   
    setNavBarState() {
        this.navStateSource.publish();
    }
    loading: boolean = false;
    isEmailVerified: boolean = true;
    currentUser: any;
    formlist: MenuDetail[] = [];
    mainformlist: MenuDetail[] = [];
    submenu: SubMenu[] = [];
    menu: MenuHeader[] = [];
    temp: any = {};
    accessMenuHeader: Observable<AccessMain[]>;
    accessMenuFormList: Observable<AccessDetail[]>;
    constructor(private router: Router, private navigationservice: NavigationService,
       
        private mainApp: AppComponent,
        private accessroleService: AccessRoleService, private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');      
        this.isEmailVerified = this.currentUser.isEmailVerified;
        console.log('navmenu isEmailVerified value');
        console.log(this.isEmailVerified);
        if (this.isEmailVerified == null) {
            this.isEmailVerified = true;
        }
        this.navStateSource.publish();
    }
    filterformsR(key: number, type: number) {
        if (this.accessMenuFormList == null) return this.accessMenuFormList;
        else  return this.accessMenuFormList.filter((x:any) => x.menuKey == key && x.hierarchy == type);
    }
    filtersubmenuR(key: number, h: number) {
        if (this.accessMenuHeader == null) return this.accessMenuHeader;
        else  return this.accessMenuHeader.filter((x: any) => x.mainMenuKey == key && x.hierarchy == h);
    }
    filterMainR() {
        if (this.accessMenuHeader == null) return this.accessMenuHeader;
       else return this.accessMenuHeader.filter((x: any) => x.hierarchy == 0);
    }
    getList(flag: boolean) {
        console.log("flag is - "+ flag);
        if (flag) {
            if (this.currentUser.roleKey && this.currentUser.roleKey > 0) {
                this.getListByRole(this.currentUser.roleKey);
                console.log(this.currentUser.roleKey);
            }
            else {
                this.getListByWithoutRole();
            }
        }
        else {
            this.accessMenuHeader = new Observable<AccessMain[]>();
            this.accessMenuFormList = new Observable<AccessDetail[]>();
        }
      
    }
  
    getListByRole(role:any) {
        if (this.checkLogin()) {
           
                this.accessroleService.getFixedHeaderAfterLogin(role)
                    .subscribe(
                        (data:any) => {
                            this.accessMenuHeader = data;
                        },
                        (error:any) => {
                            this.alertService.error(error._body);
                            this.loading = false;
                        }
                );
                this.accessroleService.getFormListAfterLogin(role)
                    .subscribe(
                    (data: any) => {
                           
                            this.accessMenuFormList = data;
                        },
                        error => {
                            this.alertService.error(error._body);
                            this.loading = false;
                        }
                    );
           
        }
    }

    getListByWithoutRole() {
        if (this.checkLogin()) {           
                this.navigationservice.getMenuForPresignIn().subscribe(
                    data => {
                        this.formlist = data.formList;
                        this.mainformlist = data.mainFormList;
                        this.submenu = data.subMenuList;
                        this.menu = data.fixedHeader;
                    },
                    error => {
                        this.alertService.error(error._body);
                        this.loading = false;
                    });           
        }
    }

    reload() {
        location.reload();
    }
    getEmptyList() {        
        this.navigationservice.presignIn().subscribe(
            data => {
                this.formlist = data.formList;
                this.mainformlist = data.mainFormList;
                this.submenu = data.subMenuList;
                this.menu = data.fixedHeader;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });

    }
    ngOnInit(): void {
       this.getList(true);
      
    }

    checkLogin() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (this.currentUser.unitKey && this.currentUser.unitKey > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    logout() {
        this.accessMenuHeader = new Observable<AccessMain[]>();
        this.accessMenuFormList = new Observable<AccessDetail[]>();
        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.isEmailVerified = true;
        this.mainApp.showheader();       
        DisposeTokenHelper();
        this.router.navigate(['/signin']);
    }
    hideMenu() {
        this.mainApp._showMenu = false;
    }
}
