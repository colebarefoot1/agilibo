export interface ScrumUser {
    userKey: string;
    firstName: string;
    lastName: string;
    dob: Date;
    email: string;
    skypeID: string;
    phoneNo: string;
    jobTitle: string;
    department: string;
    username: string;
    password: string;
    scrumRoleKey: string;
    scrumDevelopemntRoleKey: string;
    companyKey: number;
    photo?: any;
    fileType: string;
    fileName: string;
    passportNumber: string;
    isFirstLogin: boolean;
    created: Date;
    createdBy: string;
    modified: Date;
    modifiedBy: string;
    companyName: string;
    unitKey: string;
    memberRequestId: string;

   
}