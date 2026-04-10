const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Proxy vers Google Apps Script (évite le problème CORS)
app.post('/submit', async (req, res) => {
  try {
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyEWTooXSsVQ-CurxNKJEND5GCn7Bc1zGQyIonGnF_-a_SRL8u38b0-LZzNiLXw4jMH/exec";
    
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));