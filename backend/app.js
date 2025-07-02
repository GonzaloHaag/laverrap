import express from "express";
import cors from "cors"
import AuthRouter from "./controllers/auth.js";
import { authenticate } from "./middleware/authenticate.js";
const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res) => {
  res.send('Hello world')
})
app.use('/api/auth',AuthRouter);

// Rutas protegidas para todo lo que venga luego del register o login
app.use(authenticate);

export default app;
