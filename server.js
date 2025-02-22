import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // En Node 18+, usa `globalThis.fetch` en lugar de node-fetch

const app = express();
const PORT = 3001;
const API_URL = "https://trefle.io/api/v1/plants";
const API_KEY = "NH6bG_HVBKNnPV4k5COs8NLXhvmd7lEG63vuMsurYmI"; // Usa variables de entorno en producción

app.use(cors()); // Permite peticiones desde el frontend

app.get("/api/plants", async (req, res) => {
  try {
    const response = await fetch(`${API_URL}?token=${API_KEY}`);
    if (!response.ok) {
      throw new Error("Error en la API de Trefle");
    }
    const data = await response.json();
    res.json(data.data); // Enviamos solo la lista de plantas
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
