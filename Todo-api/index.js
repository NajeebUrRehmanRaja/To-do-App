import { app } from "./App.js";
import { connectDB } from "./src/config/db.config.js";
import { env } from "./src/config/env.config.js";

const port = env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
