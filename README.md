# 📝 Mon API Blog - Compte Rendu Complet du Projet (MERN Stack)

## 👤 Développeur

- **Nom :** Hedyene Mili
- **Établissement :** École Polytechnique de Sousse
- **Période :** Septembre - Octobre 2025

## 🚀 Objectifs Généraux

Ce projet a pour but de développer une API REST complète pour un blog, en utilisant le stack MERN : **M**ongoDB, **E**xpress.js, **R**eact (Front-end non inclus dans le Back-end), **N**ode.js. Le travail se concentre sur le développement du Back-end (API-First).

---

## 📁 Structure Finale du Projet

L'architecture est structurée selon le principe de la **Séparation des Préoccupations (SoC)** :

```text
mon-api-blog/
├── controllers/
│   ├── articleController.js # Logique métier des articles (CRUD)
│   └── userController.js    # Logique métier des utilisateurs (CRUD)
├── models/
│   ├── Article.js           # Schéma et Modèle Mongoose Article
│   └── User.js              # Schéma et Modèle Mongoose User
├── routes/
│   ├── articleRoutes.js     # Définition des routes Articles (/api/articles)
│   └── userRoutes.js        # Définition des routes Utilisateurs (/api/users)
├── server.js                # Point d'entrée, Configuration, Middleware & Connexion DB
├── package.json             # Configuration du projet & scripts
└── node_modules/
```

---

## 🛠️ TP 1 : Fondations et Routes Initiales

**Date de réalisation : 29 septembre 2025**

### 1\. Initialisation et Dépendances

- **Dossier & Initialisation :** `mkdir mon-api-blog` puis `npm init -y`.
- **Installation :** `npm install express mongoose dotenv`.
- **Développement :** `npm install --save-dev nodemon`.

### 2\. Configuration des Scripts

| Script  | Commande            | Description                                  |
| :------ | :------------------ | :------------------------------------------- |
| `start` | `node server.js`    | Mode production                              |
| `dev`   | `nodemon server.js` | Mode développement (redémarrage automatique) |

### 3\. Endpoints Statiques & Initiaux

- Mise en place du middleware `app.use(express.json())`.
- **GET /** : Page d'accueil (`<h1>...</h1>`).
- **GET /about** : Page À Propos.
  ```javascript
  app.get("/about", (req, res) => {
    res.send(`<h1>À propos de notre API Blog</h1>...`);
  });
  ```
- **GET /api/test** : Test de l'API (`{ "success": true }`).
- **GET /api/users** : Liste d'utilisateurs factices (JSON statique).
- **POST /api/articles** : Création d'article (simulée avec `req.body` et un ID factice).
- **POST /contact** : Réception d'un message avec validation des champs (`email` et `message`).

### 🎯 Concepts Compris (TP1)

- **Architecture API-First.**
- **express.json()** pour parser le corps des requêtes JSON.
- Utilisation des codes HTTP : **200**, **201**, **400**.

---

## 🧩 TP 2 : Structuration de l'API (Routes et Contrôleurs)

**Date de réalisation : 06 octobre 2025**

### 1\. Refactorisation Modulaire

L'objectif était de décomposer le fichier monolithique `server.js` pour une meilleure maintenabilité et lisibilité.

- **Dossier `controllers/` :** Création des fichiers `articleController.js` et `userController.js` pour isoler la **logique métier** (fonctions).
- **Dossier `routes/` :** Création des fichiers `articleRoutes.js` et `userRoutes.js` pour définir les chemins et utiliser `express.Router()`.

### 2\. Connexion dans `server.js`

Le serveur principal utilise les routeurs :

```javascript
const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require("./routes/userRoutes");

// Connexion des routeurs à leurs chemins de base respectifs
app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);
```

### 🎯 Concepts Maîtrisés (TP2)

- **Séparation des Préoccupations (SoC) :** Mieux que l'approche monolithique.
- **express.Router() :** L'outil essentiel pour créer des modules de routage.

---

## 💾 TP 3 : Intégration de MongoDB et Mongoose

**Date de réalisation : 13 octobre 2025**

### 1\. Connexion à la Base de Données

- Configuration de la chaîne de connexion MongoDB Atlas dans un fichier `.env`.
- Mise en place de la connexion dans `server.js` via Mongoose.

### 2\. Modélisation (Modèles Mongoose)

- **`models/Article.js` :** Schéma définissant les champs (`title`, `content`, `author`) et leurs contraintes.
- **`models/User.js` :** Schéma définissant les champs (`username`, `email`, `password`) avec contraintes :
  - `username`: String, `required: true`.
  - `email`: String, `required: true`, `unique: true`.
  - `password`: String, `required: true`.

### 3\. Mise à Jour des Contrôleurs (Read All & Create)

Les contrôleurs ont été mis à jour pour utiliser des opérations asynchrones avec la base de données :

- **getAllArticles/Users :** Utilisation de `Article.find()` / `User.find()`.
- **createArticle/User :** Utilisation de `Article.create(req.body)` / `User.create(req.body)`.
- **Gestion des erreurs :** Utilisation systématique de `async/await` et du bloc `try...catch` pour renvoyer un statut **500** en cas d'erreur serveur/DB.

### 🎯 Concepts Compris (TP3)

- **Programmation Asynchrone :** Nécessité de `async/await` pour gérer I/O avec la DB.
- **Mongoose :** Rôle du Schéma (validation et structure) et du Modèle (interface de la collection).

---

## 🧠 TP 4 : Finalisation du Cycle CRUD

**Date de réalisation : 20 octobre 2025**

### 1\. Ciblage des Ressources

- **Paramètres de Route :** Utilisation des paramètres dans l'URL (`/api/articles/:id`) pour cibler une ressource spécifique, accessible via **`req.params.id`**.

### 2\. Implémentation du CRUD Article

Les contrôleurs ont été complétés pour les opérations de mise à jour, lecture et suppression.

| Méthode    | Endpoint            | Opération | Méthode Mongoose                  | Statut HTTP       |
| :--------- | :------------------ | :-------- | :-------------------------------- | :---------------- |
| **GET**    | `/api/articles/:id` | Read One  | `Article.findById(req.params.id)` | **200** / **404** |
| **PUT**    | `/api/articles/:id` | Update    | `Article.findByIdAndUpdate()`     | **200** / **404** |
| **DELETE** | `/api/articles/:id` | Delete    | `Article.findByIdAndDelete()`     | **200** / **404** |

#### Options Cruciales (PUT)

- **`{ new: true }` :** Assure que le document retourné est la version **après** la mise à jour.
- **`{ runValidators: true }` :** Applique les règles de validation du schéma Mongoose avant la mise à jour.

### 3\. Travail Pratique Complémentaire : CRUD Utilisateurs

Le même cycle CRUD a été implémenté pour la ressource **Users** en utilisant :

- `User.findById()`
- `User.findByIdAndUpdate()`
- `User.findByIdAndDelete()`

Toutes les routes (GET, PUT, DELETE) gèrent correctement l'erreur **404 Not Found** si l'ID n'existe pas, et le **500 Internal Server Error** en cas d'erreur de base de données.

### 📡 Endpoints Disponibles (API)

| Méthode      | Endpoint                | Description                          |
| :----------- | :---------------------- | :----------------------------------- |
| `GET`        | `/api/articles`         | Récupère tous les articles           |
| `POST`       | `/api/articles`         | Crée un nouvel article               |
| **`GET`**    | **`/api/articles/:id`** | Récupère un article par son ID       |
| **`PUT`**    | **`/api/articles/:id`** | Met à jour un article par son ID     |
| **`DELETE`** | **`/api/articles/:id`** | Supprime un article par son ID       |
| `GET`        | `/api/users`            | Récupère tous les utilisateurs       |
| **`GET`**    | **`/api/users/:id`**    | Récupère un utilisateur par son ID   |
| **`PUT`**    | **`/api/users/:id`**    | Met à jour un utilisateur par son ID |
| **`DELETE`** | **`/api/users/:id`**    | Supprime un utilisateur par son ID   |

### 🎯 Points Clés à Retenir (Finalisation CRUD)

- `req.params.id` est l'outil pour récupérer l'identifiant dans l'URL.
- Les méthodes `findById...` retournent **`null`** si l'élément n'existe pas, ce qui déclenche l'erreur **404**.
- Le testing avec Postman est indispensable à chaque étape du développement.
