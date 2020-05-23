export class SuccessResponse {
  public code: number;
  public body: object;

  constructor(code: number, body: object) {
    this.code = code;
    this.body = body
  }
}