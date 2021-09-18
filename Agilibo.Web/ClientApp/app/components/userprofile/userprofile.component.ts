import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { UserProfile, CountryDropdown, CompanyDropdown } from '../../models/UserProfile';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { WorkType } from '../../models/WorkType';
import { AlertService } from '../../services/alert.service';
import { Department } from '../../models/Department';
import { Methodology } from '../../models/Methodology';
import { DepartmentService } from '../../services/setup/department.service';
import { WorkTypeService } from '../../services/setup/workType.service';
import { ScrumDevelopmentRole } from '../../models/ScrumDevelopmentRole';
import { ScrumRole } from '../../models/ScrumRole';
import { ScrumDevelopmentRoleService } from '../../services/setup/scrumDevelopmentRole.service';
import { ScrumRoleService } from '../../services/setup/scrumRole.service';
import { UserProfileService } from '../../services/userprofile/userprofile.service';
import { EmploymentType } from '../../models/EmploymentType';
import { EmploymentTypeService } from '../../services/setup/employmentType.service';
import { ScrumUser } from '../../models/ScrumUser';
import { AccessRole } from '../../models/AccessRole';
import { CompanyUnit } from '../../models/CompanyUnit';
import { CompanyUnitService } from '../../services/companyunit.service/companyunit.service';
import { NavMenuComponent } from '../navmenu/navmenu.component';
import { ImageMessage } from '../../models/ImageMessage';
import * as signalR from '../../../../node_modules/@aspnet/signalr';
import { HubConnection } from '../../../../node_modules/@aspnet/signalr';
import { AppConfig } from '../../../AppConfig';

@Component({
    selector: 'userprofile',
    templateUrl: './userprofile.component.html'
})

export class UserprofileComponent implements OnInit {
    imageUrl: string = "";
    fileToUpload: File = null;
    loading = false;
    countrylist: CountryDropdown[] = [];
    companylist: CompanyDropdown[] = [];
    id: string = "";
    scrumrolelist: ScrumRole[] = [];
    employmenttypelist: EmploymentType[] = [];
    devrolelist: ScrumDevelopmentRole[] = [];
    departmentlist: Department[] = [];
    unitlist: CompanyUnit[] = [];
    currentUser: LoggedinUserInformation;
    errorMessage: string = "";
    model: any = {};
    images: any = {};
    public _hubConnection: any;
    @ViewChild("fileInput") fileInput: any;
    constructor(
        private router: Router,
        private departmentservice: DepartmentService,
        private userprofileservice: UserProfileService,
        private devroleservice: ScrumDevelopmentRoleService,
        private scrumroleservice: ScrumRoleService,
        private employmenttypeservice: EmploymentTypeService,
        private alertService: AlertService,
        private companyUnitService: CompanyUnitService, private config: AppConfig
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.id = this.currentUser.userKey;
    }

    public formatDate(today: Date) {
        if (today == null) {}
        else {
            this.model.dob = today.toString().substr(0, 10);
        }      
    }

    //Show image preview
    handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0);
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.imageUrl = event.target.result;
        }
        reader.readAsDataURL(this.fileToUpload);
    }

    //image upload
    addFile() {
        this.model.userKey = this.currentUser.userKey;
        this.userprofileservice.upload(this.fileToUpload, this.currentUser.userKey).subscribe(
            data => {
                console.log('done');
                this._hubConnection.invoke('UpdateUserPhoto', this.model.userKey);
                this.getImage();
                this.fileToUpload = null;
                //Image.value = null;
                
            }
        );
    }

    getImage() {
        this.model.userKey = this.currentUser.userKey;
        console.log(this.images);
        this.userprofileservice.getImage(this.currentUser.userKey).subscribe(
            data => {
                console.log(this.currentUser.userKey);
                this.images = this.userprofileservice.imageStore;
                
            }
        );
    }

    ngOnInit(): void {

        this._hubConnection = new HubConnection(this.config.feedsApiUrl, { transport: signalR.TransportType.WebSockets | signalR.TransportType.LongPolling });
        this._hubConnection.serverTimeoutInMilliseconds = 100000; // 100 second

        this._hubConnection.on('Group', (data: any) => {
            console.log(data);
            console.log('Group Information');
        });

        this._hubConnection.start()
            .then(() => {
                console.log('Pocker Hub connection started From Sprint');

                // this._hubConnection.invoke('StartFeed', this.currentUser.userKey)
                this.loading = false;
            })
            .catch(() => {
                console.log('Error while establishing connection');
            });     

        this.userprofileservice.getImage(this.currentUser.userKey).subscribe(
            data => {
                console.log(this.currentUser.userKey);
                this.images = this.userprofileservice.imageStore;
                console.log(this.images);

            }
        );

        if (this.id != null) {
            this.userprofileservice.getScrumUserForProfileUpdate(this.id)
                .subscribe(data => {
                    this.model = data;
                    this.formatDate(this.model.dob);
                }, error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
        }
        //load All CompanyUnits
        this.companyUnitService.getUnitPerCompany(this.currentUser.companyKey)
            .subscribe(data => { this.unitlist = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        //load all the employmenttype
        this.employmenttypeservice.getAll()
            .subscribe(data => { this.employmenttypelist = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });

        //load all the department
        this.departmentservice.getAll()
            .subscribe(data => { this.departmentlist = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });

        //fill ScrumRole Selectlist
        this.scrumroleservice.getAll()
            .subscribe(data => {
                this.scrumrolelist = data;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });

        //fill DevelopmentRole Selectlist
        this.devroleservice.getAll()
            .subscribe(data => { this.devrolelist = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });

        //load all the country
        this.userprofileservice.getAllCountry()
            .subscribe(data => { this.countrylist = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });

        //load all the companylist
        this.userprofileservice.getAllCompany()
            .subscribe(data => { this.companylist = data; console.log(data); },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });

        //this.getImage();

    }

    public getunitbycompany(companyKey: number) {
        this.companyUnitService.getUnitPerCompany(companyKey)
            .subscribe(data => { this.unitlist = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    confirmpassword: any = {};
    public checkConfirmpassword(confirmpassword: string, password: string) {
        if (confirmpassword != null && confirmpassword !== "" && password != null && password !== "") {
            if (confirmpassword !== password) return true;
            else return false;
        }
        return false;
    }

    sample: any = {};
    public Submit() {
        this.loading = true;
        this.model.modifiedBy = this.currentUser.userKey;
        this.model.userKey = this.currentUser.userKey;
        //this.model.fileName = this.fileToUpload.name;
        //this.model.fileType = this.fileToUpload.type;
        this.userprofileservice.savethisProfile(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Information has been updated successfully', false);
                    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                    this.currentUser.unitKey = this.model.unitKey;
                    this.currentUser.companyKey = this.model.companyKey;
                    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));                 
                    this.sample = JSON.parse(localStorage.getItem('currentUser') || '{}');                  
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
}