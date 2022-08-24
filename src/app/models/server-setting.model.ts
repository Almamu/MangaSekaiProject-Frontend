export interface ServerSettingModel<T> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Id: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Value: T;
}
