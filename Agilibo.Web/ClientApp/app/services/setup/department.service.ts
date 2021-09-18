import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { Department } from '../../models/Department';
import TokenHelper from '../../services/tokenHelper';

@Injectable()
export class DepartmentService {
    constructor(private http: Http, private config: AppConfig) { }
    departmentList: Department[] = [];
    //used in userprofile
    getAll(): Observable<Department[]> {
        return this.http.get(this.config.apiUrl + '/Department/GetAll', TokenHelper())
            .map((response: Response) => { this.departmentList = response.json(); return this.departmentList;})
            .catch(this.errorHandler);

    }
   
    getById(id: string): Observable<Department> {
        return this.http.get(this.config.apiUrl + '/Department/GetDetail/' + id, TokenHelper())
            .map((response: Response) => {response.json(); console.log(response.json());})
            .catch(this.errorHandler);
    }

    create(userDto: Department): Observable<object> {
        return this.http.post(`${this.config.apiUrl}/Department/Create`, userDto, TokenHelper());           
    }

    update(userDto: Department): Observable<object> {
        return this.http.post(this.config.apiUrl + '/Department/Update', userDto, TokenHelper());
    }

    delete(id: string): Observable<object> {
        return this.http.get(this.config.apiUrl + '/Department/Delete/'+id, TokenHelper());         
    }

    errorHandler(error: Response) {
       console.log(error);
        return Observable.throw(error);
    }  
   
}