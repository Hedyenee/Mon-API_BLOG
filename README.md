📝 Mon API Blog - Compte Rendu du Projet

📁 Structure du Projet
text
mon-api-blog/
├── server.js # Point d'entrée principal
├── package.json # Configuration du projet
├── package-lock.json # Verrouillage des versions
└── node_modules/ # Dépendances installées

🛠️ Installation et Démarrage

1. Initialisation du Projet

# J'ai créé le dossier du projet

mkdir mon-api-blog
cd mon-api-blog

# Initialisation du projet Node.js

npm init -y

2. Installation des Dépendances

# Installation d'Express (framework web)

npm install express

# Installation de Nodemon (pour le développement)

npm install --save-dev nodemon

3. Configuration des Scripts
   Dans le fichier package.json, j'ai ajouté :

json
"scripts": {
"start": "node server.js",
"dev": "nodemon server.js"
}

💻 Création du Serveur Express
Fichier : server.js

🧪Test des Routes avec Postman

1. Test des Routes GET

GET /

Description : Retourne une page HTML d'accueil.

Réponse attendue :

<h1>Page d'accueil de notre API de Blog!</h1>

GET /api/test

Description : Retourne un JSON de confirmation que l'API fonctionne.

Réponse attendue :

{
"message": "Le test a fonctionné !",
"success": true
}

GET /about

Description : Affiche des informations sur l'API Blog.

Réponse attendue :

<h1>À propos de notre API Blog</h1>
<p>Cette API permet de gérer les articles d'un blog</p>
<p>Version 1.0 - Développée avec Express.js</p>

GET /api/users

Description : Retourne la liste des utilisateurs en JSON.

Réponse attendue :

[
{ "id": 1, "name": "Alice Dupont", "email": "alice@example.com", "role": "Auteur" },
{ "id": 2, "name": "Bob Martin", "email": "bob@example.com", "role": "Éditeur" },
{ "id": 3, "name": "Charlie Brown", "email": "charlie@example.com", "role": "Lecteur" }
]

2. Test de la Route POST /api/articles

Corps de la requête (JSON) :

{
"title": "Mon premier article",
"content": "Ceci est le contenu de mon article.",
"author": "John Doe"
}

Réponse attendue (JSON) :

{
"message": "Article créé avec succès !",
"article": {
"id": 1743703200000,
"title": "Mon premier article",
"content": "Ceci est le contenu de mon article.",
"author": "John Doe"
}
}

3. Test de la Route POST /contact

Corps de la requête (JSON) :

{
"email": "contact@example.com",
"message": "Bonjour, j'aimerais plus d'infos sur votre API."
}

Réponse attendue (JSON) :

{
"success": true,
"message": "Message reçu de contact@example.com !",
"receivedMessage": "Bonjour, j'aimerais plus d'infos sur votre API."
}

Cas d'erreur (si email ou message manquant) :

{
"error": "L'email et le message sont obligatoires"
}

🔧 Travail Pratique

1. Route GET /about
javascript :
app.get('/about', (req, res) => {
res.send(` <h1>À propos de notre API Blog</h1>
   <p>Cette API permet de gérer les articles d'un blog</p>
   <p>Version 1.0 - Développée avec Express.js</p>
`);
  });

📡 Endpoints Disponibles
| Méthode | Endpoint | Description |
| ------- | ------------- | ---------------------- |
| GET | / | Page d'accueil |
| GET | /about | Page à propos |
| GET | /api/test | Test de l'API |
| GET | /api/users | Liste des utilisateurs |
| POST | /api/articles | Création d'article |
| POST | /contact | Envoi de message |

🎯 Concepts Compris et Maîtrisés

1. Architecture API-First
   J'ai compris que l'API est le fondement de l'application

Elle doit être conçue avant le front-end

Permet une séparation claire entre back-end et front-end

2. Middleware Express
   express.json() permet de parser les requêtes JSON

Doit être placé avant les routes qui en ont besoin

Rend les données accessibles via req.body

3. Gestion des Routes
   Différence entre res.send() et res.json()

Codes HTTP appropriés (200, 201, 400)

Structure cohérente des réponses JSON

4. Workflow de Développement
   Utilisation de nodemon pour le redémarrage automatique

Tests systématiques avec Postman

Gestion des dépendances avec npm

🚀 Lancement du Projet

# Mode développement (avec redémarrage automatique)

npm run dev

# Mode production

npm start

📅 Date de réalisation : 29 septembre 2025

🧠 MERN - Semaine 4 : Finalisation des Opérations CRUD
🎯 Objectifs du TP
Ce TP avait pour but de rendre notre API Node.js + Express + MongoDB (MERN) totalement fonctionnelle en complétant le cycle CRUD :
• Lire un article spécifique (Read One)
• Mettre à jour un article (Update)
• Supprimer un article (Delete)
• Tester toutes les routes avec Postman
• Comprendre et gérer les paramètres de route (req.params.id)
• Utiliser correctement les codes de statut HTTP (200, 404, 500, etc.)

---

⚙️ Partie 1 – Concepts Techniques
🔹 Les Paramètres de Route
• Permettent de cibler une ressource spécifique via une URL comme /api/articles/:id
• Accessible dans le contrôleur avec req.params.id
Exemple :
router.get('/:id', getArticleById)
🔹 Méthodes HTTP et Status Codes
Méthode Usage Statut
GET Lire une ressource 200 OK
PUT Mettre à jour (remplacer) une ressource 200 OK
DELETE Supprimer une ressource 200 OK ou 204 No Content
404 Ressource non trouvée —
🔹 Méthodes Mongoose utilisées
• findById(id) → Lire un seul document
• findByIdAndUpdate(id, data, options) → Modifier un document
• findByIdAndDelete(id) → Supprimer un document
Options importantes :
{ new: true, runValidators: true }
• new: true → retourne le document après la mise à jour
• runValidators: true → applique les règles de validation du schéma

---

🧩 Partie 2 – Atelier Pratique : Implémentation du CRUD
Étape 1 – Lire un article spécifique (Read One)
Fichier : controllers/articleController.js
const getArticleById = async (req, res) => {
try {
const article = await Article.findById(req.params.id)
if (!article)
return res.status(404).json({ message: "Article non trouvé." })
res.status(200).json(article)
} catch (err) {
res.status(500).json({ message: "Erreur serveur.", error: err.message })
}
}
Étape 2 – Mettre à jour un article (Update)
Fichier : controllers/articleController.js
const updateArticle = async (req, res) => {
try {
const updated = await Article.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true, runValidators: true }
)
if (!updated)
return res.status(404).json({ message: "Article non trouvé." })
res.status(200).json(updated)
} catch (err) {
res.status(400).json({ message: "Erreur lors de la mise à jour.", error: err.message })
}
}
Étape 3 – Supprimer un article (Delete)
const deleteArticle = async (req, res) => {
try {
const deleted = await Article.findByIdAndDelete(req.params.id)
if (!deleted)
return res.status(404).json({ message: "Article non trouvé." })
res.status(200).json({ message: "Article supprimé avec succès.", id: req.params.id })
} catch (err) {
res.status(500).json({ message: "Erreur serveur.", error: err.message })
}
}
Étape 4 – Cycle de Test avec Postman

1. POST /api/articles → Créer un article et copier son \_id
2. GET /api/articles → Lire tous les articles
3. GET /api/articles/:id → Lire un article spécifique
4. GET /api/articles/fake_id → Tester le 404
5. PUT /api/articles/:id → Modifier l’article (titre, contenu, etc.)
6. DELETE /api/articles/:id → Supprimer l’article
7. GET /api/articles/:id → Vérifier que le 404 s’affiche après suppression

---

📸 Travail Pratique Complémentaire
Implémenter le même CRUD pour la ressource Users :
• GET /api/users/:id
• PUT /api/users/:id
• DELETE /api/users/:id
➡️ Utiliser :
User.findById()
User.findByIdAndUpdate()
User.findByIdAndDelete()
➡️ Gérer les erreurs 404 et tester avec Postman.
➡️ Inclure dans le rapport : captures d’écran des requêtes réussies + erreurs (404).

---

📚 Points à retenir
• req.params.id sert à récupérer un ID dans l’URL
• findById retourne null si l’élément n’existe pas
• new: true permet d’avoir le document mis à jour dans la réponse
• runValidators: true applique les contraintes du modèle Mongoose
• Toujours gérer les erreurs avec un message clair + bon code HTTP
• Tester chaque route CRUD avec Postman avant de passer à la suite

---

🧾 Structure finale du projet
project/
│
├── controllers/
│ └── articleController.js
│
├── models/
│ └── Article.js
│
├── routes/
│ └── articleRoutes.js
│
├── server.js
└── README.md
📅 Date de réalisation : 13 oct 2025

👨‍💻 Développeur : Hedyene Mili
🏫 École Polytechnique de Sousse
