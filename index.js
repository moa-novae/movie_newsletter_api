import routes from "./routes/index.js";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/test", routes.test);
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
