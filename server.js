const express = require("express");
const mongoose = require("mongoose");
// 🚨 AJOUT : Pour lire les variables du fichier .env
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

// Utilisation de la variable d'environnement (TP3)
const DB_URI = process.env.MONGODB_URI;

// Import des routeurs
const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require("./routes/userRoutes");

// Middleware pour lire le JSON
app.use(express.json());

// --- ROUTES DE BASE  ---

// Route d'accueil
app.get("/", (req, res) => {
  res.status(200).send("<h1>Bienvenue sur l’API du blog</h1>");
});

// Route GET /about (TP1.1)
app.get("/about", (req, res) => {
  res.status(200).json({
    version: "1.0",
    description: "API de blog MERN.",
  });
});

// Route POST /contact
app.post("/contact", (req, res) => {
  const { email, message } = req.body;
  if (!email || !message) {
    return res
      .status(400)
      .json({ message: "Veuillez fournir un email et un message." });
  }
  // La réponse inclut l'email
  res.status(200).json({
    message: `Message reçu de ${email} !`,
  });
});

// --- MONTAGE DES ROUTEURS API  ---

app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);

// --- CONNEXION À MONGODB ET DÉMARRAGE DU SERVEUR ---

// Vérification de l'URI avant de se connecter
if (!DB_URI) {
  console.error(
    "❌ ERREUR FATALE: MONGODB_URI n'est pas défini. Vérifiez votre fichier .env."
  );
  process.exit(1);
}

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("✅ Connexion à MongoDB réussie !");
    // Démarrer le serveur après la connexion réussie
    app.listen(PORT, () =>
      console.log(`📡 Serveur démarré sur http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.error("❌ Échec de la connexion à MongoDB :", error.message);
  });
