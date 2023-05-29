const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const rootRouter = require("./routers");
const connectToDB = require("./connectDB");

connectToDB().then(() => {
  console.log("done!!!");
});
app.use(morgan("combined"));
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser);
app.use(rootRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on http://localhost/${port}`);
});
