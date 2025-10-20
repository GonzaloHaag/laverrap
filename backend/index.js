process.loadEnvFile();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);
app.get("/api/hello", (req, res) => {
  res.send("Hello from the backend!");
});

app.post("/api/send-notification", async (req, res) => {
    console.log("Request body:", req.body);
  const { client_phone } = req.body;
  
  console.log("Client phone extracted:", client_phone);
  
  if (!client_phone) {
    return res.status(400).json({ success: false, error: "Client phone number is required" });
  }

  try {
    const response = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:+549${client_phone}`,
      body: `Este es un mensaje de Laverrap: Su lavado a finalizado, recuerde que estamos hasta las 18hs. Gracias por elegirnos!`,
      statusCallback: "https://gruffly-crowned-gunner.ngrok-free.dev/api/notification-status",
    });

   return res.status(200).json({
      success: true,
      sid: response.sid,
      status: response.status,
   })
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Número de teléfono inválido",
      details: error.message 
    });
  }
});

/** Weebhook */
app.post("/api/notification-status", (req, res) => {
  const { MessageSid, MessageStatus } = req.body;
  console.log(`Mensaje ${MessageSid}: ${MessageStatus}`);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
