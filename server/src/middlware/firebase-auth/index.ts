import admin from "firebase-admin";
import { Response, NextFunction } from "express";

export const FBAuth = (req: any, res: Response, next: NextFunction) => {
  if (!req.headers["authorization"])
    return res.status(403).json("unauthorized request");

  const authHeader = req.headers["authorization"].split(" ");
  if (authHeader[0] !== "Bearer")
    return res.status(400).json("unable to process request");

  admin
    .auth()
    .verifyIdToken(authHeader[1])
    .then((user) => {
      req.user = user;
      return next();
    })
    .catch((err) => {
      return res.status(400).json({ Error: err });
    });
};
