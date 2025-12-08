import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import serviceRoutes from "./routes/service.routes";
import clientRoutes from "./routes/client.routes";
import employeeRoutes from "./routes/employee.routes";
import washingRoutes from "./routes/washing.routes";
import config from "./utils/config";
import authMiddleware from "./middlewares/auth.middleware";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(express.json()); // Permite leer body en formato JSON

app.use("/api/auth", authRoutes);
/** a partir de aca, middleware para insertar el user en cada
 * request!
 */
app.use(authMiddleware);
app.get("/", (req, res) => {
  console.log(req.user); // tngo el user por el middleware
  res.send("Hello, Laverrap Backend!");
});
app.use("/api/services", serviceRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/washed", washingRoutes);

// Middleware de errores debe ir AL FINAL
app.use(errorMiddleware);

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
