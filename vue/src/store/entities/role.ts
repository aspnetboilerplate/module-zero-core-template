import Entity from './entity'

export default class Role extends Entity<number>{
    name:string;
    displayName:string;
    normalizedName:string;
    description:string;
    isStatic:boolean;
    permissions:string[]
}