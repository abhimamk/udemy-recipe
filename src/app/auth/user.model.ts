export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private __tokenExpirationDate: Date
  ) { }
  get token() {
    if (!this.__tokenExpirationDate || new Date() > this.__tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
