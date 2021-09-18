
import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router, ActivatedRoute } from '@angular/router';
import { CrossTeamDependencyService } from "../../services/crossTeamDependency/crossTeamDependency.service";
import { CrossTeamDependency, CrossTeamView, TypeOfCrossTeamDependency } from '../../models/CrossTeamDependency';
import { ScrumTeamService } from "../../services/scrumTeam/scrumTeam.service";
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { ScrumTeam } from '../../models/ScrumTeam';
import { Sprint } from '../../models/Sprint';
import { SprintService } from '../../services/sprint/sprint.service';

import { AlertService } from '../../services/alert.service';
import { RerouteToSignin } from '../../services/rerouteToSignin';
import { ExternalDependencyService } from '../../services/crossTeamDependency/external.service';
import { PagerService } from '../../services/pagerservice';


@Component({
    selector: 'crossTeamDependency',
    templateUrl: './crossTeamDependency.component.html'
})
export class CrossTeamDependencyComponent implements OnInit {
    loading = false;
    model: any = {};
    id: string = "";
    primaryTeam: ScrumTeam[] = [];
    dependentTeam: ScrumTeam[] = [];
    primarySprint: Sprint[] = [];
    dependentSprint: Sprint[] = [];
    dependencylist: CrossTeamView[] = [];
    dependencyTypelist: TypeOfCrossTeamDependency[] = [];
    teamname: string = "";
    currentUser: LoggedinUserInformation;
    errorMessage: string = "";
    //variable to check the validation of internal dependency
    hasdependentOnTeamKey: boolean = false;
    hasdependentOnTeamSprintKey: boolean = false;
    hasdependentUserStory: boolean = false;
    IsInternal: boolean = true;
    IsExternal: boolean = false;
    hasexternalteam: boolean = false;
    hasprimaryTeamKey: boolean = false;
    hasdependencyUserStory: boolean = false;
    hasprimaryTeamSprintKey: boolean = false;
    hastypeofDependencyKey: boolean = false;
    // end of variable to check the validation of internal dependency
    // pager object
    pager: any = {};
    filter: string = "";
    // paged items
    pagedItems: any[];
    constructor(private _avRoute: ActivatedRoute,
        private router: Router,
        private redirectUser: RerouteToSignin,
        private scrumTeamService: ScrumTeamService,
        private crossdependencyservice: CrossTeamDependencyService,
        private externaldependencyservice: ExternalDependencyService,
        private sprintservice: SprintService,
        private alertService: AlertService,
        private pagerService:PagerService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
            this.model.createdBy = this.currentUser.userKey;
            this.model.modifiedBy = this.currentUser.userKey;
        }
    }
    filteredItems: any = [];
    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.dependencylist.length, page);

        // get current page of items
        this.pagedItems = this.dependencylist.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
    search() {
        this.filteredItems = [];
        this.filteredItems = Object.assign([], this.pagedItems);
        console.log(this.filter);
        if (this.filter != "") {

            this.filteredItems = Object.assign([], this.pagedItems).filter(
                item => (item.dependentUserStory.toLowerCase().includes(this.filter.toLowerCase()) ||
                    item.dependentTeamName.toLowerCase().includes(this.filter.toLowerCase()))
            );
            console.log(this.filteredItems);
        } 
        this.dependencylist = this.filteredItems;
        this.setPage(1);
    }
    formReload() {
        this.IsInternal = true;
        this.IsExternal = false;
        //fill PrimaryScrumTeam
        this.scrumTeamService.getAll(this.currentUser.companyKey)
            .subscribe(data => {
                this.primaryTeam = data;
            },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
        //fill DependentScrumTeam
        this.scrumTeamService.getAll(this.currentUser.companyKey)
            .subscribe(data => {
                this.dependentTeam = data;
            },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
        //fill CrossTeamDependencyType
        this.crossdependencyservice.getAllCrossTeamDependencyType()
            .subscribe(data => {
                this.dependencyTypelist = data;
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }
    ngOnInit(): void {
        this.getDependencyList();
        this.redirectUser.sendToLogin();
        this.formReload();
    }
    getExternal() {
        //fill PrimarySprint
        if (this.model.typeofDependencyKey == 5) {
            this.IsInternal = false;
            this.IsExternal = true;
        }
        else {
            this.IsInternal = true;
            this.IsExternal = false;
        }
    }
    getPrimarySprint() {
        //fill PrimarySprint
        if (this.model.primaryTeamKey != "undefined") {
            this.sprintservice.getPrimarySprintByTeamKeyForCrossTeamDependency(this.model.primaryTeamKey)
                .subscribe(data => {
                    this.primarySprint = data;
                }, error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
        }
        this.getDependencyListTeamwise();
    }

    getDependentSprint() {
        //fill PrimarySprint
        this.sprintservice.getPrimarySprintByTeamKeyForCrossTeamDependency(this.model.dependentOnTeamKey)
            .subscribe(data => {
                this.dependentSprint = data;
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    getDependencyList() {
        this.crossdependencyservice.getAll(this.currentUser.companyKey)
            .subscribe(data =>
            {
                this.dependencylist = data;
                this.setPage(1);
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    getDependencyListTeamwise() {
        console.log(this.model.primaryTeamKey);
        if (this.model.primaryTeamKey != "undefined") {
            this.crossdependencyservice.getAllSpecifiedByTeamKey(this.model.primaryTeamKey)
                .subscribe(data => {
                    this.dependencylist = data;
                    this.setPage(1);
                },
                    error => {
                        this.alertService.error(error._body);
                        this.loading = false;
                    });
        }
    }
    clearForm() {
        var newTabUrl = "/crossTeamDependency";
        location.href = newTabUrl;
        //this.formReload();
        //this.model.primaryTeamKey = "";
        //this.model.typeofDependencyKey = "";
        //this.model.crossTeamDependencyKey = null;
        //this.model.dependencyUserStory = "";
        //this.model.primaryTeamSprintKey = "";    
        //this.model.dependentOnTeamKey = "";
        //this.model.dependentOnTeamSprintKey = "";
        //this.model.dependentUserStory = "";
        //this.model.externalteam = "";
        //this.getDependencyList();   
    }
    public submit() {
        this.loading = true;
        console.log(this.model);
        this.model.createdBy = this.currentUser.userKey;
        this.model.modifiedBy = this.currentUser.userKey;
        if (this.model.typeofDependencyKey == 5) {

            if (this.model.externalteam == null || this.model.externalteam =="") {
                this.hasexternalteam = true;
                this.loading = false;
            }
            else {
                this.hasexternalteam = false;
            }
            if (this.model.primaryTeamKey == null) {
                this.hasprimaryTeamKey = true;
                this.loading = false;
            }
            else {
                this.hasprimaryTeamKey = false;
            }
            if (this.model.dependencyUserStory == null) {
                this.hasdependencyUserStory = true;
                this.loading = false;
            }
            else {
                this.hasdependencyUserStory = false;
            }
            if (this.model.typeofDependencyKey == null) {
                this.hastypeofDependencyKey = true;
                this.loading = false;
            }
            else {
                this.hastypeofDependencyKey = false;
            }
            if (this.model.primaryTeamSprintKey == null) {
                this.hasprimaryTeamSprintKey = true;
                this.loading = false;

            }
            else {
                this.hasprimaryTeamSprintKey = false;
            }
            if (this.loading == true) {
                console.log(this.model);
                this.externaldependencyservice.create(this.model)
                    .subscribe(
                    data => {
                        console.log("External CrossTeamDepedency");
                            this.alertService.success('External Dependency has been saved successfully', true);
                        this.getDependencyList();
                        this.clearForm();
                        this.hasexternalteam = false;
                        this.hasprimaryTeamKey = false;
                        this.hasdependencyUserStory = false;
                        this.hasprimaryTeamSprintKey = false;
                        this.hastypeofDependencyKey = false;
                            this.model.createdBy = this.currentUser.userKey;
                            this.model.modifiedBy = this.currentUser.userKey;
                            this.loading = false;
                        },
                        error => {
                            this.alertService.error(error._body);
                            this.loading = false;
                        });
            }
        }
        else {
            if (this.model.primaryTeamKey == null) {
                this.hasprimaryTeamKey = true;
                this.loading = false;
            }
            else {
                this.hasprimaryTeamKey = false;
            }
            if (this.model.dependentOnTeamKey == null) {
                this.hasdependentOnTeamKey = true;
                this.loading = false;
            }
            else {
                this.hasdependentOnTeamKey = false;
            }
            if (this.model.dependentOnTeamSprintKey == null) {
                this.hasdependentOnTeamSprintKey = true;
                this.loading = false;
            }
            else {
                this.hasdependentOnTeamSprintKey = false;
            }
            if (this.model.dependentUserStory == null) {
                this.hasdependentUserStory = true;
                this.loading = false;
            }
            else {
                this.hasdependentUserStory = false;
            }
            if (this.model.dependencyUserStory == null) {
                this.hasdependencyUserStory = true;
                this.loading = false;
            }
            else {
                this.hasdependencyUserStory = false;
            }
            if (this.model.primaryTeamSprintKey == null) {
                this.hasprimaryTeamSprintKey = true;
                this.loading = false;
            }
            else {
                this.hasprimaryTeamSprintKey = false;
            }
            if (this.model.typeofDependencyKey == null) {
                this.hastypeofDependencyKey = true;
                this.loading = false;
            }
            else {
                this.hastypeofDependencyKey = false;
            }
            if (this.loading == true) {
                console.log(this.model);
                this.crossdependencyservice.create(this.model)
                    .subscribe(
                    data => {
                        console.log("Internal CrossTeamDepedency");
                            this.alertService.success('Dependency has been saved successfully', true);
                        this.getDependencyList();
                        this.clearForm();
                        this.hasdependentOnTeamKey = false;
                        this.hasdependentOnTeamSprintKey = false;
                        this.hasprimaryTeamKey = false;
                        this.hasdependentUserStory = false;
                        this.hasdependencyUserStory = false;
                       
                        this.hastypeofDependencyKey = false;
                        this.hasprimaryTeamSprintKey = false;
                            this.model.createdBy = this.currentUser.userKey;
                            this.model.modifiedBy = this.currentUser.userKey;
                            this.loading = false;
                        },
                        error => {
                            this.alertService.error(error._body);
                            this.loading = false;
                        });
            }
        }
    }

    public edit(id: string, isExternal: boolean) {
        this.crossdependencyservice.getByKey(id, isExternal)
            .subscribe((data) => {
                this.formReload();
                
                this.model = data;
                console.log(this.model);
                if (isExternal==false)this.getDependentSprint();
                this.getPrimarySprint();
                if (this.model.typeofDependencyKey == 5) {
                    this.IsInternal = false;
                    this.IsExternal = true;
                }
                else {
                    this.IsInternal = true;
                    this.IsExternal = false;
                }
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    public delete(id: string,isExternal:boolean) {
        var ans = confirm("Do you want to Remove this?");
        if (ans) {
            this.crossdependencyservice.delete(id, isExternal).subscribe((data) => {
                this.alertService.success('Data Deleted successfully', true);
                this.getDependencyList();
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
    }

}
