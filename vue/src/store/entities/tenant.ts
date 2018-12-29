import Entity from './entity'

export default class Tenant extends Entity<number>{
    tenancyName:string;
    name:string;
    isActive:boolean;
    adminEmailAddress:string;
    connectionString:string;    
}