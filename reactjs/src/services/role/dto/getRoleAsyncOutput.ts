export interface GetRoleAsyncOutputItem {
  name: string;
  displayName: string;
  isDefault: boolean;
  isStatic: boolean;
  creationTime: Date;
  id: number;
}

export default interface GetRoleAsyncOutput {
  items: GetRoleAsyncOutputItem[];
}
