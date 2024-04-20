export interface MenuItem {
    icon?: string; 
    icon_type?: 'img' | 'mat';
    title: string;
    route: any | any[];
    child: ChildItem[];
    svgIcon: string;
    permissions?: string[];
}

export interface ChildItem{
    icon?: string; 
    icon_type?: 'img' | 'mat';
    title: string;
    route: any | any[];
    svgIcon: string;
    permissions?: string[];
}