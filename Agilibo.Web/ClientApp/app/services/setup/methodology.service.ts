import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { Methodology } from '../../models/Methodology';
import TokenHelper from '../../services/tokenHelper';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';

@Injectable()
export class MethodologyService {
  
    constructor(private http: Http, private config: AppConfig) {       
    }  
    //used in TeamManage
    getAll(indata:string): Observable<Methodology[]> {         
        return this.http.get(this.config.apiUrl + '/Methodology/GetAll', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    
    getById(id: string) {
        return this.http.get(this.config.apiUrl + '/Methodology/GetDetail/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    create(userDto: Methodology) {
        return this.http.post(this.config.apiUrl + '/Methodology/Create', userDto, TokenHelper());
    }

    update(userDto: Methodology) {
        return this.http.post(this.config.apiUrl + '/Methodology/Update', userDto, TokenHelper());
    }

    delete(id: string) {
        return this.http.get(this.config.apiUrl + '/Methodology/Delete/' + id, TokenHelper());
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }  
    
}