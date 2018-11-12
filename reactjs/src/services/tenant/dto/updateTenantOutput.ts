export interface UpdateTenantOutputItem {
  tenancyName: string;
  name: string;
  isActive: boolean;
  id: number;
}

export default interface UpdateTenantOutput {
  result: UpdateTenantOutputItem;
}
