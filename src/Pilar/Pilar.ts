import express from "express";
import {Application} from "express";
import bodyParser = require("body-parser");
import cors from 'cors';
import {loggerMiddleware} from "../Middlewares/loggerMiddleware";

interface IPilar {
  port: number;
  cors?: boolean;
  baseRoute?: string;
  logging?: boolean;
  middleWares?: any;
  routes: any;
}

export class Pilar {
  private readonly port: number;
  private readonly cors: boolean;
  private readonly baseRoute: string;
  private readonly logging: boolean;


  private app: Application;

  constructor(config: IPilar) {
    this.app        = express();
    this.port       = config.port;
    this.cors       = config.cors || false;
    this.baseRoute  = config.baseRoute || '/';
    this.logging    = config.logging || false;

    this.setup();
    if(config.middleWares) {
      this.middlewares(config.middleWares);
    }
    this.routes(config.routes);
  }

  private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare)
    })
  }

  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
    controllers.forEach(controller => {
      this.app.use(this.baseRoute, controller.router)
    })
  }

  private setup() {
    if(this.cors) {
      this.app.use(cors());
    }
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());
    if(this.logging) {
      this.app.use(loggerMiddleware);
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`)
    })
  }

}