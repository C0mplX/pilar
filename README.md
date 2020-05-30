# Pilar
A super lightweight framework for working with express in a more structural and easy way. 

## How to use it
In order to get started using Pilar just run
 
`$ yarn add pilar-server`

Then in order to create a new express server you add the following

```
const pilar = new Pilar({
  port: 3001,
  cors: true,
  baseRoute: '/',
  routes: []
});
```
With the command abov you wil get a express server listening on port 3001, but since there are no
routes there will be little action on the server. Lets add a new route!

### Add routes
The routes are classes using some base elements of Pilar. in order to create a new route simply create 
a class like this 

```
import {Request, Response} from "express";
import {BaseRouter, ErrorResponse, IBaseRouter, SuccessResponse} from "pilar-server";

/**
* We extend the class from pilars BaseRouter. This lets us use some built in stuff like
* pilars routing system.
*/

class UserRoutes extends BaseRouter implements IBaseRouter {
    public readonly path = '/user';
    
    constructor() {
        super();
        this.initRoutes();
    }
    
    /**
    * This is were you setup all your routes. The works like a normal express route
    * and can have middlewares. 
    */
    initRoutes(): any {
        this.router.get(`${this.path}`, ifYouLikeMiddleWarePlaceItHere,  UserRoutes.getUser);
    }
    
    private static async getUser(req: Request, res: Response) {
        res.send(new SuccessResponse(200, {user: "some user data"}));
    }
}
export class UserRoutes;
```

Then wen you have setup a route  simply add it to your pilar class like so:
```
const pilar = new Pilar({
  port: 3001,
  cors: true,
  baseRoute: '/',
  routes: [new UserRotes()]
});
```

if you want middlewares that are used on all routes you can add them here: 
```
const pilar = new Pilar({
  port: 3001,
  cors: true,
  baseRoute: '/',
  middleWares: [myloggerMiddleware],
  routes: [new UserRotes()]
});
```
pilar also comes with a simple logger in order to turn it on simply add 
`logging:true`
```
const pilar = new Pilar({
  port: 3001,
  cors: true,
  baseRoute: '/',
  middleWares: [myloggerMiddleware],
  routes: [new UserRotes()],
  logging: true
});
```

