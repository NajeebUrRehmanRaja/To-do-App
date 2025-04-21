import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import app from "./app.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
