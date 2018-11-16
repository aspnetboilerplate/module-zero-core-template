export interface GetTenantOutputItems {
  tenancyName: string;
  name: string;
  isActive: boolean;
  id: number;
}

export default interface GetTenantOutput {
  result: GetTenantOutputItems;
}
