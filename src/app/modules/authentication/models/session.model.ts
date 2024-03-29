export class SessionModel {
  constructor (
    public token: string,
    // disabled because it's data that comes like this from the API
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public expire_time: number,
    public isadmin: boolean,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public user_id: number,
  ) { }

  static fromJSON (json: string): SessionModel {
    const data = JSON.parse (json);

    // ensure there's enough keys to get a correct session model
    if ('token' in data === false)
      throw new Error ('the token is not present');
    if ('expire_time' in data === false)
      throw new Error ('the expire_time is not present');
    if ('isadmin' in data === false)
      throw new Error ('the isadmin is not present');
    if ('user_id' in data === false)
      throw new Error ('the user_id is not present');

    return new SessionModel (data.token, data.expire_time, data.isadmin, data.user_id);
  }

  static toJSON (session: SessionModel): string {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return JSON.stringify ({token: session.token, expire_time: session.expire_time, isadmin: session.isadmin, user_id: session.user_id});
  }

  get valid (): boolean {
    const currentUnix = new Date ().getTime () / 1000;

    return this.expire_time > currentUnix;
  }
}
