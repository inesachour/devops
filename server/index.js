require("dotenv").config();
const express = require("express");
const app = express();
require("./DB/connection");
const cors = require("cors");
const router = require("./Routes/route")

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(5000, () => {
  console.log("server is running at port 5000");
});
