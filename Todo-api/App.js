import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import mylistRoutes from "./routes/myLists.js";
app.use("/api/myLists", mylistRoutes);

export { app };