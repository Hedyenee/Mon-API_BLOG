// controllers/articleController.js

// Import du modèle Article
const Article = require("../models/Article");

// --- TEST DE L'API ---
const testApi = (req, res) => {
  res.status(200).json({
    message: "Le test depuis le contrôleur a fonctionné !",
    success: true,
  });
};

// --- Récupérer tous les articles ---
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ 
      message: "Erreur lors de la récupération des articles.", 
      error: err.message 
    });
  }
};

// --- Créer un nouvel article ---
const createArticle = async (req, res) => {
  try {
    const newArticle = await Article.create(req.body);
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ 
      message: "Échec de la création de l'article.", 
      error: err.message 
    });
  }
};

// --- Récupérer un article par ID ---
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(400).json({ 
      message: "ID d'article invalide.", 
      error: err.message 
    });
  }
};

// --- Mettre à jour un article ---
const updateArticle = async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(400).json({ 
      message: "Erreur lors de la mise à jour.", 
      error: err.message 
    });
  }
};

// --- Supprimer un article ---
const deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article non trouvé." });
    }
    res.status(200).json({ 
      message: "Article supprimé avec succès.", 
      id: req.params.id 
    });
  } catch (err) {
    res.status(500).json({ 
      message: "Erreur serveur.", 
      error: err.message 
    });
  }
};

// --- Export des fonctions ---
module.exports = {
  testApi,
  getAllArticles,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
};
