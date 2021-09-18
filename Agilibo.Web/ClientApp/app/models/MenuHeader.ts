export interface MenuHeader {
    menuKey: number;
    menuName: string;
    displayLevel: number;
    selected: boolean;
}
export interface MenuDetail {
    detailKey: number;
    menuKey: number;
    menuName: string;
    title: string;
    titleLink: string;
    displayLevel: number;
    selected: boolean;
    descendLevel: number;
    isExternal: boolean;
}
export interface SubMenuView {
    subMenuKey: number;
    menuKey: number;
    menuName: string;
    title: string;
    titleLink: string;
    displayLevel: number;
    selected: boolean;
    Hierarchy: number;
    isExternal: boolean;
}