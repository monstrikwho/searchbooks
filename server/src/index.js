const express = require('express')
const mongoose = require('mongoose')
const config = require('config')


// if (!process.env.JWT_SECRET) {
//   const err = new Error("No JWT_SECRET in env variable!");
//   console.error(err);
// }

var app = express();

app.use(express.json({ extended: true }));

// app.use("/api/auth", require("./routes/auth.routes"));
// app.use("/api/link", require("./routes/link.routes"));
// app.use("/t", require("./routes/redirect.routes"));

// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static(path.join(__dirname, "client", "build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }


// Server Setup
const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`\x1b[32m`, `App has been started on port ${PORT}...`, `\x1b[0m`));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
