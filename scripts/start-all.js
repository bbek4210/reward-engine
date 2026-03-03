const { spawn } = require("child_process");

const server = spawn("npm", ["run", "dev", "--prefix", "server"], {
  stdio: "inherit",
});
const client = spawn("npm", ["run", "dev", "--prefix", "client"], {
  stdio: "inherit",
});

process.on("exit", () => {
  server.kill();
  client.kill();
});
