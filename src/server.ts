import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import helmet from "helmet";
import { v4 as uuidv4 } from "uuid";
import express from "express";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const cspSource = [
  "'self'",
  "localhost:3000",
  "localhost",
  (req, res: any) => {
    if (!res.locals.nonce) {
      throw new Error("Failed to generate nonce");
    }
    return `'nonce-${res.locals.nonce}'`;
  },
];

export default polka()
  .use(
    (req, res, next) => {
      if (!res.locals) {
        res.locals = {};
      }
      res.locals.nonce = uuidv4();
      next();
    },

    /*helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: cspSource,
          scriptSrc: cspSource,
        },
      },
    }),*/
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    cookieParser(),

    sapper.middleware({
      session: (req, res) => {
        return {
          user: req.user,
        };
      },
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
