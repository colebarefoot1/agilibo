export interface ScrumTeamMember {
    assignKey: string;
    teamKey: string;
    userKey: string;
    scrumRoleKey: string;
    scrumDevelopemntRoleKey: string;
    created: string;
}
export interface CustomScrumTeamMember {
    userKey: string;
    teamKey: string;
    firstName: string;
    lastName: string;
    dOB: Date;
    email: string;
    skypeID: string;
    phoneNo: string;
    jobTitle: string;       
    departmentKey: string;
    allocationTypeKey: string;
    allocationNumber: number;
    employmentTypeKey: string;
    employmentLevel: string;
    scrumRoleKey: string;
    scrumDevelopemntRoleKey: string;
    created: string;
    companyKey: number;
    unitKey:  number;
}