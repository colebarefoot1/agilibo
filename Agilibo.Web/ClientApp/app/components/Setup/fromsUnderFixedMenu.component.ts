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
import { FormService } from '../../services/setup/form.service';

@Component({
    selector: 'formsUnderFixedMenu',
    templateUrl: './formsUnderFixedMenu.component.html'
})

export class FormsUnderFixedHeaderComponent implements OnInit {
    menulist: MenuHeader[] = [];
    submenulist: MenuDetail[] = [];
    errorMessage: string = "";
    model: any = {};
    loading = false;
    constructor(
        private router: Router,
        private menuservice: FormService,
        private mainmenuservice: MenuHeaderService,
        private alertService: AlertService) {

    }
    ngOnInit(): void {
        //fill WorkType Selectlist

        this.geMenuListList();
        this.getFormList();
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
    getFormList() {
        this.menuservice.getAllFormsUnderFixedHeader().subscribe(
            data => { this.submenulist = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    public submit() {
        this.loading = true;
        console.log((this.model));
        this.menuservice.createFromsUnderFixedHeader(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Data Added successful', true);
                    this.geMenuListList();
                    this.getFormList();
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

    public delete(obj: MenuDetail) {
        var ans = confirm("Do you want to delete This");
        if (ans) {
            this.menuservice.deleteForms(obj.detailKey).subscribe((data) => {
                this.alertService.success('Data Deleted successful', true);
                this.geMenuListList();
                this.getFormList();
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
    }
}