import env from "dotenv";
import path from "path";

env.config({ path: path.resolve(__dirname, "../.env") });
const envConfig = {
    PORT: process.env.PORT || 5000,
    // MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/todo",
};

export default envConfig