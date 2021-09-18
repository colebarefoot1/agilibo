import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { ScrumUser } from '../../models/ScrumUser';

import TokenHelper from '../../services/tokenHelper';
import { PasswordReset } from '../../models/passwordreset';

@Injectable()
export class PasswordResetService {
    constructor(private http: Http, private config: AppConfig) { }

    changePassword(obj: PasswordReset) {
        return this.http.post(this.config.apiUrl + '/PasswordReset/ChangePassword', obj, TokenHelper());
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

}