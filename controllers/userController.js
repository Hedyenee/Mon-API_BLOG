// controllers/userController.js

// ✅ Import du modèle Mongoose (assure-toi d’avoir un fichier models/User.js)
const User = require('../models/User');

// --- Fonction pour récupérer tous les utilisateurs ---
const getAllUsers = (req, res) => {
  const users = [
    { id: 1, name: 'Hedyene', email: 'hedyene@example.com' },
    { id: 2, name: 'Salma', email: 'salma@example.com' },
    { id: 3, name: 'Lina', email: 'lina@example.com' },
  ];

  res.status(200).json(users);
};

// --- Fonction pour créer un nouvel utilisateur ---
const createUser = (req, res) => {
  const userData = req.body;
  console.log('Données reçues par le contrôleur :', userData);

  res.status(201).json({
    message: 'Utilisateur créé avec succès via le contrôleur !',
    user: { id: Date.now(), ...userData },
  });
};

// --- Fonction pour récupérer un utilisateur par son ID ---
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
};

// --- Fonction pour mettre à jour un utilisateur ---
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Retourne la version mise à jour + applique les validations
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la mise à jour.", error: err.message });
  }
};

// --- Fonction pour supprimer un utilisateur ---
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json({ message: "Utilisateur supprimé avec succès.", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
};

// --- Export de toutes les fonctions ---
module.exports = { 
  getAllUsers, 
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
