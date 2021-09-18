import { ScrumRole } from "./ScrumRole";

export interface StakeHolder {
    stakeHolderKey: string;
    firstName: string;
    lastName: string;
       
    email: string;
    password: string;
    scrumRoleKey: string;
    companyKey: string;
    userKey: string;
    teamKey: string;
    scrumRole: ScrumRole;
}