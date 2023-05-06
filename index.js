const express = require("express");
const PORT = 3001;

const app = express();

app.get("/", (req, res) => {
  res.send("connected");
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
