export class ErrorResponse {
  public code: number;
  public body: object;
  public debug: any;
  private readonly  type: string;

  constructor(code: number, body: object, debug?: any) {
    this.code = code;
    this.body = body;
    this.debug = process.env.NODE_ENV === 'production' ? debug : null;
    this.type = 'error'
  }
}

