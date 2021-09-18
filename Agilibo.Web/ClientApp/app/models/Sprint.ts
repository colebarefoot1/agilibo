export interface Sprint {
    sprintKey: string;
    sprintName: string;
    sprintGoal: string;
    releasePlan: string;
    storyPointCommited: number|undefined;
    storyPointCompleted: number | undefined;
    sprintDurationKey: number;
    sprintFrom: Date;
    sprintTo: Date;
    teamKey: string;
    teamName: string;
    created: Date;
    createdBy: string;
    modified: Date;
    modifiedBy: string;
    displayDate: Date;
}
export interface SprintForHeader {   
    sprintName: string;
    sprintGoal: string;   
    sprintFrom: Date | undefined;
    sprintTo: Date | undefined;   
}
export interface SprintViewModel {
    sprintKey: string;
    sprintName: string;
    sprintGoal: string;
    releasePlan: string;
    storyPointCommited: number | undefined;
    storyPointCompleted: number | undefined;
    sprintFrom: Date | undefined;
    sprintTo: Date | undefined;   
    commitPoint: string;
    completePoint: string;
    sprintDurationValue: string;
    createdOn: Date;
}
