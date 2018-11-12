export interface CreateTenantOutputItems {
  tenancyName: string;
  name: string;
  isActive: boolean;
  id: number;
}

export default interface CreateTenantOutput {
  result: CreateTenantOutputItems;
}
