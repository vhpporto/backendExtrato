require("dotenv").config();
const { errors } = require("celebrate");
const express = require("express");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(3333, () => {
  console.log("Server on port 3333");
});
