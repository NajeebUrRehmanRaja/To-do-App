import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import mylistRoutes from "./routes/mylists.js";
app.use("/api/mylists", mylistRoutes);

export { app };