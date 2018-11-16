export default interface CreateTenantInput {
  tenancyName: string;
  name: string;
  adminEmailAddress: string;
  connectionString: string;
  isActive: boolean;
}
