export interface CreateRoleOutput {
  name: string;
  displayName: string;
  normalizedName: string;
  description: string;
  permissions: string[];
  id: number;
}
