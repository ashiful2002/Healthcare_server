import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seed";

async function main() {
  try {
    await seedSuperAdmin();
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

//  multer
// npm i @types/multer

// npm i multer-storage-cloudinary
