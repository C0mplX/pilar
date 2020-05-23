import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken';
import {ErrorResponse} from "..";
const jwtSecret = process.env.JWT_SECRET || 'C8DC1841-ACA3-4DA0-920E-6E4C246C46E6';

interface IPilarResponse extends Response {
  tokenData: ITokenBody;
}

interface IAuthMiddleware {
  req: Request,
  res: IPilarResponse,
  next: NextFunction,
}

export const authMiddleware = (params: IAuthMiddleware) => {
  const {req, res, next} = params;
  if (!req.headers.authorization) {
    return res.status(403).json(new ErrorResponse(403, {message: 'Missing authorization header'}));
  }
  const parts = req.headers.authorization.split(' ');
  if( parts.length === 2 ) {
    const scheme = parts[0];
    const token = parts[1];
    if (/^Bearer$/i.test(scheme)) {
      const decodedToken = validateToken(token, TokenType.ACCESS_TOKEN);
      if(decodedToken) {
        res.tokenData = decodedToken;
        next();
      }
      return res.status(401).json(new ErrorResponse(401, {message: "Invalid token"}));
    } else {
      return res.status(401).json(new ErrorResponse(401, {message: "Missing Bearer"}));
    }
  } else {
    return res.status(401).json(new ErrorResponse(401, {message: "Wrong format on header"}));
  }
};

export enum TokenType {
  ACCESS_TOKEN="ACCESS_TOKEN",
  LONG_LIVED_TOKEN="LONG_LIVED_TOKEN"
}

interface ITokenBody {
  data: {
    type: TokenType;
    payload: any;
  }
}

export const issueAccessToken = (longLivedToken: string, payload: any) => {
  try {
    const decodedLongLivedToken: any = jwt.verify(longLivedToken, jwtSecret);
    if(decodedLongLivedToken.data.type === TokenType.LONG_LIVED_TOKEN) {
      return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 5),
        data: {
          type: TokenType.ACCESS_TOKEN,
          payload: payload
        },
      }, jwtSecret);
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const issueLongLivedToken = () => {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 36000),
    data: {
      type: 'longLivedToken',
    },
  }, jwtSecret);
};

export const validateToken = (token: string, type: TokenType) => {
  try {
    const decodedToken = jwt.verify(token, jwtSecret) as ITokenBody;
    if(decodedToken && decodedToken.data.type === type) {
      return decodedToken;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};