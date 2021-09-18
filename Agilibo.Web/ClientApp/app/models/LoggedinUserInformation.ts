export interface LoggedinUserInformation {
    userKey: string;    
    username: string;
    firstName: string;
    lastName: string;
    token: string;
    unitKey: number;
    companyKey: number;
    roleKey: number;
    roleAccess: string;
    isEmailVerified: boolean;
    userEmail: string;

    sprintName: string;
    sprintGoal: string;
    sprintFrom: Date | undefined;
    sprintTo: Date | undefined; 
    defaultTeam: string;
}