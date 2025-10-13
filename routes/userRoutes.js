const express = require('express');
const router = express.Router();
const { 
    getAllUsers, 
    createUser, 
    getUserById,    
    updateUser,     
    deleteUser      
} = require('../controllers/userController');

// Routes existantes (basées sur vos images)
router.get('/', getAllUsers);
router.post('/', createUser);

// NOUVELLES ROUTES (Travail Pratique)
router.get('/:id', getUserById);      // Récupérer un utilisateur par son ID 
router.put('/:id', updateUser);       // Mettre à jour un utilisateur 
router.delete('/:id', deleteUser);    // Supprimer un utilisateur 

module.exports = router;