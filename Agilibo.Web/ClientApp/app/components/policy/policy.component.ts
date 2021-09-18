import { Component, Inject, Output, Input, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { ScrumUser } from '../../models/ScrumUser';
import { Observable } from 'rxjs/Observable';
import { FormControl, NgModel } from '@angular/forms';
import { ClientCompany } from '../../models/ClientCompany';
import { CompanyUnit } from '../../models/CompanyUnit';
import { ClientCompanyService } from '../../services/clientcompany.service/clientcompany.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { NavMenuComponent } from '../navmenu/navmenu.component';


@Component({
    selector: 'policy',
    templateUrl: './policy.component.html'
})

export class PolicyComponent {
   


    ngOnInit(): void {
      
    }
   
    
}

