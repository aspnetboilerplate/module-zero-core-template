export class MenuItem {
    name: string = '';
    permissionName: string = '';
    requiresAuthentication: boolean = false;
    icon: string = '';
    route: string = '';
    items: MenuItem[];

    constructor(name: string, permissionName: string, icon: string, route: string, requiresAuthentication: boolean) {
        this.name = name;
        this.permissionName = permissionName;
        this.icon = icon;
        this.route = route;

        if (permissionName) {
            this.requiresAuthentication = true;
        } else {
            this.requiresAuthentication = requiresAuthentication;
        }
    }
}