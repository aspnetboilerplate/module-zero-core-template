export interface GetRoleAsyncOutputItem {
  name: string;
  displayName: string;
  isStatic: boolean;
  isDefault: boolean;
  creationTime: Date;
  id: number;
}

export default interface GetRoleAsyncOutput {
  items: GetRoleAsyncOutputItem[];
}
