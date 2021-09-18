import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { MenuHeaderService } from '../../services/setup/menuHeader.service';
import { MenuHeader, MenuDetail, SubMenuView } from "../../models/MenuHeader";
import { MenuDetailService } from '../../services/setup/menuDetail.service';

@Component({
    selector: 'submenu',
    templateUrl: './submenu.component.html'
})

export class SubMenuComponent implements OnInit {
    menulist: MenuHeader[] = [];
    submenulist: SubMenuView[] = [];
    errorMessage: string = "";
    model: any = {};
    loading = false;
    constructor(
        private router: Router,
        private menuservice: MenuDetailService,
        private mainmenuservice: MenuHeaderService,
        private alertService: AlertService) {

    }
    ngOnInit(): void {
        //fill WorkType Selectlist
       
        this.geMenuListList();
        this.getSubMenuListList();
    }
    geMenuListList() {
        this.mainmenuservice.getAll()
            .subscribe(data => {
                this.menulist = data;
            },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
    getSubMenuListList() {
        this.menuservice.getAllWhereFormIsUnderFixedHeader().subscribe(
            data => { this.submenulist = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    public submit() {
        this.loading = true;
        console.log(this.model);
        this.menuservice.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Data Added successful', true);
                    this.geMenuListList();
                    this.getSubMenuListList();
                    this.model = new Observable<MenuDetail>();
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    public edit(obj: SubMenuView) {
        this.model = obj;
    }

    public delete(obj: SubMenuView) {
        var ans = confirm("Do you want to delete This");
        if (ans) {
            this.menuservice.delete(obj.subMenuKey).subscribe((data) => {
                this.alertService.success('Data Deleted successful', true);
                this.geMenuListList();
                this.getSubMenuListList();
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
    }
}