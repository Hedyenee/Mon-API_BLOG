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
   res.send(`    <h1>À propos de notre API Blog</h1>
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
👨‍💻 Développeur : Hedyene Mili
🏫 École Polytechnique de Sousse
