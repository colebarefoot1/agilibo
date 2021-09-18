import { Department } from "./Department";
import { Methodology } from "./Methodology";
import { WorkType } from "./WorkType";

export interface CustomScrumTeamMember {
    teamKey: string;
    userKey: string;
    firstName: string;
    email: string;
    skypeID: string;
    phoneNo: string;
    jobTitle: string;   
    scrumRoleKey: string;
    scrumDevelopemntRoleKey: string;
    createdBy: string;
    modifiedBy: string;
}
export interface ScrumTeamViewList {
    teamKey: string;
    userKey: string;
    workTypeKey: string;
    methodologyKey: string;
    departmentKey: string;
    companyKey: string;
    externalIdentifier: string;
    dateEstablished: Date;
    agileAdoptedDate: Date;
    description: string;
    teamBackground: string;
    businessLine: string;
    strategicObject: string;
    teamName: string;
    department: string;
    methodology: string;
    workType: string;
    setDefault: string;
}
export interface ScrumTeam {
    teamKey: string;
    userKey: string;
    workTypeKey: string;
    methodologyKey: string;
    departmentKey: string;
    companyKey: string;
    externalIdentifier: string;
    dateEstablished: Date;
    agileAdoptedDate: Date;
    description: string;
    teamBackground: string;
    businessLine: string;
    strategicObject: string;
    teamName: string;
    department: Department;
    methodology: Methodology;
    workType: WorkType;
    createdBy: string;
    modifiedBy: string;
    created: Date;
    organizationCompanyKey: number;
}
export interface TeamDetail {
    assignKey: string;
    userKey: string;
    scrumRoleKey: string;
    scrumDevelopmentRoleKey: string;
    roleName: string;
    devRoleName: string;
    personName: string;
    email: string;
    phone: string;
    jobTitle: string;
    departmentName: string;
    employTypeName: string;
}
export interface ScrumTeamDetail {
    teamMain: ScrumTeam;
    workType: string;
    methodology: string;
    department: string;
    companyName: string;
    teamMemberList: TeamDetail[];
   
}