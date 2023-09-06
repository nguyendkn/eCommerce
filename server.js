const app = require("./src/app");

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`STARTING WITH PORT: ${PORT}`);
});

// process.on("SIGINT", () => {
//   server.close(() => console.log("EXIT SERVER EXPRESS"));
// });
