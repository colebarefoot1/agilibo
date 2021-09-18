import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { UserProfile, CountryDropdown,CompanyDropdown } from '../../models/UserProfile';
import { ScrumUser } from '../../models/ScrumUser';
import TokenHelper from '../../services/tokenHelper';
import { ImageMessage } from '../../models/ImageMessage';

@Injectable()
export class UserProfileService {
    constructor(private http: Http, private config: AppConfig) { }

    imageStore: ImageMessage[] = [];
  // used in userprofile
    getAllCompany(): Observable<CompanyDropdown[]> {
        return this.http.get(this.config.apiUrl + '/UserProfile/GetAllCompany', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    // used in userprofile
    getAllCountry(): Observable<CountryDropdown[]> {
        return this.http.get(this.config.apiUrl + '/UserProfile/GetAllCountry', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    //used in userprofile
    getScrumUserForProfileUpdate(id: string) {
        return this.http.get(this.config.apiUrl + '/UserProfile/GetScrumUserForProfileUpdate/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
   //used in userprofile
    savethisProfile(obj: UserProfile) {
        console.log(obj);
        return this.http.post(this.config.apiUrl + '/UserProfile/SavethisProfile', obj, TokenHelper());
    }
    //used in userprofile
    upload(fileToUpload: File, userKey: string) {
        const formData: FormData = new FormData();
        console.log(fileToUpload);
        formData.append('Image', fileToUpload, fileToUpload.name);
        return this.http.post(this.config.apiUrl + '/UserProfile/Upload/' + userKey, formData);
    }
    //used in userprofile
    getImage(userKey: string) {
        console.log(userKey)
        return this.http.get(this.config.apiUrl + '/UserProfile/GetImage/' + userKey, TokenHelper())
            .map((response: Response) => {
                this.imageStore = response.json();
               
            })
            .catch(this.errorHandler);
    }

    //upload(files: any) {
    //    if (files.length === 0)
    //        return;
    //    const formData = new FormData();

    //    for (let file of files)
    //        formData.append(file.name, file);
    //    console.log(files)
    //    return this.http.post(this.config.apiUrl + '/UserProfile/Upload', formData);
    //}
   
    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

}