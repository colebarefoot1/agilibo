import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../AppConfig';
import { Company } from '../models/Company';


@Injectable()
export class CompanyService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/Company/GetAll', this.jwt());
    }
    getById(id: string) {
        return this.http.get(this.config.apiUrl + '/Company/GetDetail/' + id, this.jwt());
    }
    create(userDto: Company) {
        return this.http.post(this.config.apiUrl + '/Company/Create', userDto, this.jwt());
    }
    update(userDto: Company) {
        return this.http.post(this.config.apiUrl + '/Company/Update', userDto, this.jwt());
    }
    delete(userDto: Company) {
        return this.http.post(this.config.apiUrl + '/Company/Delete', userDto, this.jwt());
    }
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

}