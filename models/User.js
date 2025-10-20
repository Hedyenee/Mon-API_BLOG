// models/User.js
const mongoose = require("mongoose");

// --- Définition du schéma utilisateur ---
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // obligatoire
      unique: true, // ne peut pas être dupliqué
      trim: true, // supprime les espaces avant/après
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // convertit automatiquement en minuscule
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // impose une longueur minimale
    },
  },
  { timestamps: true } // ajoute createdAt et updatedAt automatiquement
);

// --- Création + export du modèle ---
// ✅ Cette ligne évite l’erreur "Cannot overwrite `User` model once compiled"
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
