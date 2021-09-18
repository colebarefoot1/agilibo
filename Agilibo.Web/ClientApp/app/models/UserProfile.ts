export interface UserProfile {
    userKey: string;
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    skypeID: string;
    phoneNo: string;
    jobTitle: string;
    departmentKey: string;
    allocationTypeKey: string;
    allocationNumber: number;
    employmentTypeKey: string;
    employmentLevel: number;
    alias: string;
    password: string;
    scrumRoleKey: string;
    scrumDevelopemntRoleKey: string;
    companyKey: number;
    unitKey: number;
    photo?: any;
    fileType: string;
    fileName: string;
    passportNumber: string;
    isFirstLogin: boolean;
    created: Date;
    createdBy: string;
    modified: Date;
    modifiedBy: string;
    countryKey: string;
    
}

export interface CountryDropdown {
   countryKey: string;
    countryName: string;
    countryCode: string;

}
export interface CompanyDropdown {
    companyKey: number;
    companyName: string;


}