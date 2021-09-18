import { MenuDetail, MenuHeader } from "./MenuHeader";
import { MenuClass, SubMenu } from "./MenuClass";
import { Observable } from "rxjs/Observable";

export interface NavMenuView {
    headerlessMenu:MenuDetail[];
    menuWithHeader:MenuDetail[];
    mainMenuList:MenuClass[];
    formList:MenuDetail[];
}
export interface DefaultMenu {
    formList: MenuDetail[];
    mainFormList: MenuDetail[];
    subMenuList: SubMenu[];
    fixedHeader: MenuHeader[];
}
