const express = require('express');
const router = express.Router();
const { 
    getAllArticles, 
    createArticle, 
    getArticleById,  
    updateArticle,   
    deleteArticle    
} = require('../controllers/articleController');


router.get('/', getAllArticles); 
router.post('/', createArticle);

// NOUVELLES ROUTES (Finalisation du CRUD)
router.get('/:id', getArticleById);     // Lire un article  
router.put('/:id', updateArticle);      // Mettre à jour un article 
router.delete('/:id', deleteArticle);   // Supprimer un article 

module.exports = router;