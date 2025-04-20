import express from "express";
import cors from "cors";

export const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import myListsRoute from "./src/routes/myLists-Route";

app.use("/api/v1/litsnotes", myListsRoute);
app.get("/", (req, res) => {
  res.send("Welcome to the Todo API!");
});
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
