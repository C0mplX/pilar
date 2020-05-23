import { Response } from 'express'
import {SuccessResponse} from "./SuccessResponse";
import {ErrorResponse} from "./ErrorResponse";

class BaseRouter {
  private isProduction: boolean;

  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  public static successResponse(res: Response, payload: any) {
    res.send(new SuccessResponse(200, payload));
  }

  public static errroResponse(res: Response, status: number, message: any, exception: any) {
    res.send(new ErrorResponse(status, {message, debug: exception ? null : exception }));
  }
}

export default BaseRouter;