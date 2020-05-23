import express from "express";
import {Application} from "express";
import bodyParser = require("body-parser");
import cors from 'cors';

interface IPilar {
  port: number;
  cors?: boolean;
  baseRoute?: string;
  middleWares: any;
  controllers: any;
}

class Pilar {
  private readonly port: number;
  private readonly cors: boolean;
  private readonly baseRoute: string;

  private app: Application;

  constructor(config: IPilar) {
    this.app        = express();
    this.port       = config.port;
    this.cors       = config.cors || false;
    this.baseRoute  = config.baseRoute || '/';

    this.setup();
    this.middlewares(config.middleWares);
    this.routes(config.controllers);
  }

  private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare)
    })
  }

  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router)
    })
  }

  private setup() {
    if(this.cors) {
      this.app.use(cors());
    }
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`)
    })
  }

}

export default Pilar;