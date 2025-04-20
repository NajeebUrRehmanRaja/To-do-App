import { env } from "./config/env.config.jsx";
import connectDB from "./config/db-config.jsx";
import { app } from "./App.jsx";

const PORT = env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
