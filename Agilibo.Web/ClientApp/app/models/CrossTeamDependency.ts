export interface CrossTeamDependency {
    crossTeamDependencyKey: string;
    typeofDependencyKey: string;
    primaryTeamSprintKey: string;
    dependentOnTeamSprintKey: string;
    primaryTeamKey: string;
    dependentOnTeamKey: string;
    dependencyUserStory: string;
    dependentUserStory: string;
    created: Date;
    createdBy: string;
    modified: Date;
    modifiedBy: string;
    externalteam: string;
}

export interface CrossTeamExternalDependency {
    crossTeamDependencyKey: string;
    typeofDependencyKey: string;
    primaryTeamSprintKey: string;
    primaryTeamKey: string;
    fromDate: Date;
    toDate: Date;
    duration: number;
    sprintName: string;
    dependencyUserStory: string;
    dependentTeamName: string;
    dependentUserStory: string;
    created: Date;
    createdBy: string;
    modified: Date;
    modifiedBy: string;
}

export interface TypeOfCrossTeamDependency {
    typeofDependencyKey: string;
    typeName: string;
}

export interface CrossTeamView {
    crossTeamDependencyKey: string;
    typeofDependencyKey: string;
    dependencyTypeName: string;
    primaryTeamKey: string;
    dependentOnTeamKey: string;
    primaryTeamName: string;
    dependentTeamName: string;
    primaryTeamSprintKey: string;
    dependentOnTeamSprintKey: string;
    dependencyUserStory: string;
    primaryTeamSprint: string;
    primaryTeamSprintFrom: string;
    primaryTeamSprintTo: string;
    dependentTeamSprint: string;
    dependentTeamSprintFrom: string;
    dependentTeamSprintTo: string;
    dependentUserStory: string;
    isExternal: boolean;
}

export interface TeamInfoForReportDependencyOfGrid {
    teamKey: string;
    teamName: string;
    currentSprintKey: string;
    currentSprintName: string;
    duration: number;
}

export interface TeamListWiththreeConsecutiveSprints {
    teamKey: string;
    teamName: string;
    current: DependencySecondLayer[];
    plusOne: DependencySecondLayer[];
    plusTwo: DependencySecondLayer[];
    referrel: DependencySecondLayer[];
}

export interface DependencySecondLayer {
    userStoryName: string;
    virtualnumber: number;
    dependencyDetailForCurrent: UserStoryDepency[];
}

export interface UserStoryDepency {
    sprintKey: string;
    userStory: string;
    direction: number;
    virtualnumber: number;
    dependencyType: number;
}