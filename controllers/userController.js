// Import du modèle Mongoose
const User = require("../models/User");

// --- Récupérer tous les utilisateurs  ---
const getAllUsers = async (req, res) => {
  try {
    //Utilisation de Mongoose pour récupérer les utilisateurs de la DB
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    // Gestion des erreurs serveur
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des utilisateurs.",
        error: err.message,
      });
  }
};

// --- Créer un nouvel utilisateur ---
const createUser = async (req, res) => {
  try {
    //  Utilisation de Mongoose pour enregistrer dans la DB
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    // Gère les erreurs de validation (ex: email unique)
    res
      .status(400)
      .json({
        message: "Échec de la création de l'utilisateur.",
        error: err.message,
      });
  }
};

// --- Récupérer un utilisateur par son ID  ---
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // Gestion de l'erreur 404 (Utilisateur non trouvé)
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json(user);
  } catch (err) {
    // Gère les erreurs d'ID mal formaté
    res
      .status(400)
      .json({ message: "ID utilisateur invalide.", error: err.message });
  }
};

// --- Mettre à jour un utilisateur ---
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Renvoie la version mise à jour + valide le schéma
    );

    // Gestion de l'erreur 404
    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    // Gère les erreurs de validation (ex: email unique)
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour.", error: err.message });
  }
};

// --- Supprimer un utilisateur  ---
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    // Gestion de l'erreur 404
    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res
      .status(200)
      .json({
        message: "Utilisateur supprimé avec succès.",
        id: req.params.id,
      });
  } catch (err) {
    // Gère les erreurs serveur
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
};

// --- Export de toutes les fonctions ---
module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
