import express, {Express} from "express";

export class BaseRouter {
  public router: Express;

  constructor() {
    this.router = express();
  }
}