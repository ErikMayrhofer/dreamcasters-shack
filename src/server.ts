import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

//export default polka() // You can also use Express
polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    cookieParser(),
    sapper.middleware({
      session: (req, res) => {
        //console.log(req.cookies);
        return {
          user: req.user,
        };
      },
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
