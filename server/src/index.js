const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const middlewares = require("./middlewares");
const logs = require("./api/logs");

const app = express();
// mongoose
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const port = process.env.PORT || 1338;

// log every requests handy for development
app.use(morgan("common"));
// helmet removes sensitive headers and add some secure and handy headers for our express app
app.use(helmet());
// cors policy allow our frontend origin to do requests from another domain
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// body parsing middleware
app.use(express.json());

// another cahnge
app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});
// router
app.use("/api/logs", logs);

// middleware to handle errors
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
