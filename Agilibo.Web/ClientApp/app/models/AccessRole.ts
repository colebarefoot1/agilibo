export interface AccessRole {
    roleKey: number;
    roleName: string;
    created: Date;
    createdBy: string;
    modified: Date;
    modifiedBy: string;
}

export interface AccessMain {
    accessKey: number;
    menuKey: number;
    roleKey: number;
    title: string;
    titleLink: string;
    displayIndex: number;
    hierarchy: number;
    mainMenuKey: number
    created: Date;
    createdBy: string;
    modified: Date;
    modifiedBy: string;
}

export interface AccessDetail {
    pKey: number;
    accessKey: number;
    detailMenuKey: number;
    menuKey: number;
    roleKey: number;
    title: string;
    titleLink: string;
    displayIndex: number;
    hierarchy: number;
    created: Date;
    createdBy: string;
    modified: Date;
    modifiedBy: string;
    isExternal: boolean;
}