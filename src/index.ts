import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import routes from "./routes";
import {
  errorHandler,
  logHandler,
  authenticate,
  checkRole,
  AppError,
} from "./middlewares";
import connectDB from "./config/database";

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware (logs each request)
app.use(logHandler);

// Route middlewares
app.use("/users", authenticate, routes.userRoutes);
app.use("/products", routes.productRoutes);
app.use("/auth", routes.authRoutes);
app.use("/admin", authenticate, checkRole(["admin"]), routes.adminRoutes);

// Root route
app.get("/", async (req, res) => {
  res.send("Hello World");
});

// Secure route example
app.get("/secure", secure, (req, res) => {
  res.send("This is a secure route");
});

// Route to intentionally trigger an error (for testing)
app.get("/error", (req, res, next) => {
  const err = new Error("An intentional error!");
  next(err); // Pass the error to the error-handling middleware
});

// Error handling middleware (should be placed at the end of the middleware stack)
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Middleware function for simple token-based security
function secure(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (authorization === "token") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}
