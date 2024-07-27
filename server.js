import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import categoryRouter from "./controller/CategoryController.js";
import notificationRouter from "./controller/NotificationController.js";
import sessionRouter from "./controller/SessionController.js";
import tagRouter from "./controller/TagController.js";
import taskRouter from "./controller/TaskController.js";
import userRouter from "./controller/UserController.js";

const app = express();
const port = 8000;
const URLVersion = `/v1`;

// Middleware for CORS
app.use(
  cors({
    origin: "*", //"http://localhost:3000"
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Middleware for parsing URL-encoded bodies with extended options
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use(URLVersion, categoryRouter);
app.use(URLVersion, notificationRouter);
app.use(URLVersion, sessionRouter);
app.use(URLVersion, tagRouter);
app.use(URLVersion, taskRouter);
app.use(URLVersion, userRouter);

app.get("/", (request, response) => {
  response.json({ message: "Connection successful." });
});

// Error handling middleware
// 500 Internal Server Error Middleware
app.use((error, request, response, next) => {
  console.error(error.stack);
  response
    .status(500)
    .json({ status: "error", message: "Internal Server Error" });
});

// 404 Not Found middleware
app.use((request, response) => {
  response.status(404).json({ status: "error", message: "Resource not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
