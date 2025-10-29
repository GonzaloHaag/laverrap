import express from "express";
import cors from "cors";
import routes from "./routes/index.ts";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", routes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
export default app;
