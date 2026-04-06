import app from "./app";
import config from "./app/config";
import { envVars } from "./app/config/env";

async function main() {
  try {
    app.listen(envVars.PORT, () => {
      console.log(
        `Example app listening on port http://localhost:${envVars.PORT}`
      );
    });
  } catch (err) {
    console.log(err);
  }
}

main();
