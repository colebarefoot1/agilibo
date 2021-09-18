export interface VelocityProgressView {
    sprintKey: string;
    sprintName: string;
    sprintGoal: string;
    releasePlan: string;
    storyPointCommited: number;
    storyPointCompleted: number;
    committed: string;
    completed: string;
    committementChange: number;
    committementChangeValue: string;
    overDeliveryValue: string;
    overDelivery: number;
    sprintFrom: Date;
    sprintTo: Date;
    sprintDurationKey: string;
    durationName: string;
    teamKey: string;
    teamName: string;
    dateSpan: string;
    runningVelocityForFiveSprintValue: string;
    runningVelocityForFiveSprints: number;
}
export interface combinedCharts {
    category: category[];
    commit: Commit[];
    complete: Complete[];
    changeCommit: ChangeCommit[];
    runningVel: RunningVel[];
    overDeliver: OverDeliver[];
   
    }
export interface category {
    label: string;
    
}
export interface Commit {
    value: number;
    }
export interface Complete {
    value: number;
    }
export interface ChangeCommit {
    value: number;
    }
export interface RunningVel {
    value: number;
    }
export interface OverDeliver {
    value: number;
    }