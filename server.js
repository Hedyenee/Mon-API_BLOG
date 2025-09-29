// --- Import Express ---
// On importe le module express pour pouvoir créer notre serveur et gérer les routes
const express = require("express");

// On crée une instance de l'application Express
const app = express();

// On définit le port sur lequel le serveur va écouter
const PORT = 3000;

// --- Middleware ---
// Middleware pour parser le JSON des requêtes entrantes
// Donc si le client envoie des données en JSON, on peut les récupérer avec req.body
app.use(express.json());

// --- Routes GET ---
// Route principale "/" qui répond avec un message HTML
app.get("/", (req, res) => {
  res.status(200).send("<h1>Page d'accueil de notre API de Blog!</h1>");
});

// Route GET "/api/test" qui renvoie une réponse JSON pour tester si l'API fonctionne
app.get("/api/test", (req, res) => {
  res.status(200).json({
    message: "Le test a fonctionné !",
    success: true,
  });
});

// --- Route pour gérer les requêtes POST ---
// Route pour créer un article avec les données envoyées par le client
app.post("/api/articles", (req, res) => {
  // req.body contient les données envoyées grâce à express.json()
  const articleData = req.body;
  console.log("Données reçues :", articleData);

  // On renvoie les données reçues avec un id généré automatiquement
  res.status(201).json({
    message: "Article créé avec succès !",
    article: { id: Date.now(), ...articleData }, // On ajoute un id unique basé sur la date
  });
});

// Route GET "/about" qui renvoie des infos sur l'API
app.get("/about", (req, res) => {
  res.send(`
    <h1>À propos de notre API Blog</h1>
    <p>Cette API permet de gérer les articles d'un blog</p>
    <p>Version 1.0 - Développée avec Express.js</p>
  `);
});

// Route GET "/api/users" qui renvoie une liste d'utilisateurs en JSON
app.get("/api/users", (req, res) => {
  const users = [
    {
      id: 1,
      name: "Alice Dupont",
      email: "alice@example.com",
      role: "Auteur",
    },
    {
      id: 2,
      name: "Bob Martin",
      email: "bob@example.com",
      role: "Éditeur",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Lecteur",
    },
  ];
  res.status(200).json(users);
});

// Route POST "/contact" pour recevoir un message de contact
app.post("/contact", (req, res) => {
  const { email, message } = req.body;

  // Vérification si l'email ou le message est manquant
  if (!email || !message) {
    return res.status(400).json({
      error: "L'email et le message sont obligatoires",
    });
  }

  // On renvoie une confirmation si tout est ok
  res.status(200).json({
    success: true,
    message: `Message reçu de ${email} !`,
    receivedMessage: message,
  });
});

// --- Lancement du serveur ---
// On démarre le serveur sur le port défini et on affiche un message dans la console
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
