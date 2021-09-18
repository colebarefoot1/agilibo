import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { MenuHeaderService } from '../../services/setup/menuHeader.service';
import { MenuHeader } from "../../models/MenuHeader";
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html'
})

export class MenuComponent implements OnInit {

    menulist: MenuHeader[] = [];
    errorMessage: string = "";
    filteredProducts: MenuHeader[] = [];
    model: any = {};
    loading = false;
    currentUser: LoggedinUserInformation;
    constructor(
        private router: Router,
        private menuservice: MenuHeaderService,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }

    ngOnInit(): void {
       
        this.getList();
    }
    getList() {
        this.menuservice.getAll().subscribe(
            data => { this.menulist = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    public submit() {
        this.loading = true;
        this.menuservice.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Data Added successful', false);
                    this.getList();
                    this.model = new Observable<MenuHeader>();
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

   

    public edit(obj: MenuHeader) {
        this.model = obj;
    }

    public delete(obj: MenuHeader) {
        var ans = confirm("Do you want to delete This");
        if (ans) {
            this.menuservice.deleteWithSubMenu(obj.menuKey).subscribe((data) => {
                this.alertService.success('Data Deleted successful', false);
                this.getList();
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
    }
}
