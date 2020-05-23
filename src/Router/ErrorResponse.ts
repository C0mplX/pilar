export class ErrorResponse {
  public code: number;
  public body: object;
  private readonly  type: string;

  constructor(code: number, body: object) {
    this.code = code;
    this.body = body;
    this.type = 'error'
  }
}

