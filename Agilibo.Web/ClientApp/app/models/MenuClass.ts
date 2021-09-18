import { MenuDetail } from "./MenuHeader";
import { AccessRole, AccessMain, AccessDetail } from "./AccessRole";
import { Observable } from "rxjs/Observable";

export interface SubMenuClass {
    subMenuKey: number;
    menuKey: number;
    submenu_Key: number;
    menuName: string;
    title: string;
    titleLink: string;
    displayLevel: number;
    hierarchy: number;
    selected: boolean;
}
export interface MenuforDropdownSelection {
    menuKey: number;
    menuName: string;
    hierarchy: number;
    selected: boolean;
}
export interface SubMenu {
    subMenuKey: number;
    menuKey: number;
    title: string;
    TitleLink: string;
    displayLevel: number;
    hierarchy: number;
}
export interface MenuHeader {
    menuKey: number;
    menuName: string;
    displayLevel: number;

}
export interface MenuClass {

    submenuKey: number,
    menuKey: number;
    menuName: string;
    displayLevel: number;
    detailList: MenuDetail[];
    selected: boolean;
    hierarchy: number;
}
export interface CreateRoleClass {

    roles: MenuDetail[];
    roleName: string;
}
export interface GetMenuList {

    formlist: MenuClass[];

}
export interface AccessMenuView {
    roleName: string;
    roleKey: number;
    subheaderList: MenuClass[];
    mainMenuList: MenuClass[];
    formList: MenuDetail[];

    accessMenuHeader: AccessMain[];
    accessMenuFormList: AccessDetail[];
    accessMenuDetailList: AccessDetail[];
}
export interface RoleViewModel {
    roleName: string;
    mainList: AccessMain[];
    detailList: AccessDetail[];

}
