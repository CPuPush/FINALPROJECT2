require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const routes = require("./routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

// TESTING
module.exports = app;