import { Server } from "http";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seed";


let server: Server
async function main() {
  try {
    await seedSuperAdmin();
    server = app.listen(envVars.PORT, () => {
      console.log(
        `Example app listening on port http://localhost:${envVars.PORT}`
      );
    });
  } catch (err) {
    console.log(err);
  }
}

// SIGTERM signal error
process.on("SIGTERM", () => {
  console.log("SIGTERM signal detected. Closing server...");

  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  }
  process.exit(1);
});

// SIGINT signal error
process.on("SIGINT", () => {
  console.log("SIGINT signal detected. Closing server...");

  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  }
  process.exit(1);
});


//uncaught exception
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected. closeing server...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
//unhandled rejection 
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected. closeing server...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});





main();

