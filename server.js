const env = require("dotenv");
env.config();
const express = require("express");
const app = express();

const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const rootRouter = require("./routers");
const connectToDB = require("./connectDB");

app.use(express.json());

connectToDB().then(() => {
  console.log("done!!!");
});

app.use(morgan("combined"));
app.use(
  cors({
    origin: "*",
  })
);

app.use(rootRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`listening on http://localhost/${process.env.PORT}`);
});
