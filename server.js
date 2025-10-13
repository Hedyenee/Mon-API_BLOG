const express = require("express");
const app = express();
const PORT = 3000;

// Import des routes
const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require("./routes/userRoutes");

// Middleware pour lire le JSON dans le body
app.use(express.json());

// Route d'accueil
app.get("/", (req, res) => {
  res.status(200).send("<h1>Bienvenue sur l’API du blog</h1>");
});

// Utilisation des routeurs
app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);

// Lancement du serveur
app.listen(PORT, () =>
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`)
);
