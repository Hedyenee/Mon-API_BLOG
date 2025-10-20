// models/User.js

const mongoose = require('mongoose');

// Définition du schéma Utilisateur 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Le nom d\'utilisateur est requis.'],
        unique: true, 
        trim: true
    },
    email: {
        type: String,
        required: [true, 'L\'email est requis.'],
        unique: true, 
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe est requis.'] // 🚨 Exigence TP3
    }
}, {
    // Option pour ajouter automatiquement les champs createdAt et updatedAt
    timestamps: true 
});

// Création et export du Modèle
module.exports = mongoose.model('User', userSchema);