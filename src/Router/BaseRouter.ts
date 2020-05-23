import * as express from "express";

class BaseRouter {
  public express: any;

  constructor() {
    this.express = express.Router();
  }
}