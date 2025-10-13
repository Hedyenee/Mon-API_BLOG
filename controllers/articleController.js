// --- Import du modèle ---
const Article = require("../models/Article"); // ✅ Vérifie bien le chemin vers ton modèle

// --- FONCTION DE TEST ---
const testApi = (req, res) => {
  res
    .status(200)
    .json({
      message: "Le test depuis le contrôleur a fonctionné !",
      success: true,
    });
};

// --- CRÉATION D’ARTICLE ---
const createArticle = (req, res) => {
  const articleData = req.body;
  console.log("Données reçues :", articleData);

  // ⚠️ Normalement ici tu devrais utiliser Article.create(articleData)
  res.status(201).json({
    message: "Article créé avec succès via le contrôleur !",
    article: { id: Date.now(), ...articleData },
  });
};

// --- LECTURE D’UN ARTICLE PAR ID ---
const getArticleById = async (req, res) => {
  try {
    // req.params.id contient l’ID passé dans l’URL
    const article = await Article.findById(req.params.id);

    // Si aucun article trouvé
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    res.status(200).json(article);
  } catch (err) {
    // Gestion d’erreur
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
};

// --- MISE À JOUR D’UN ARTICLE ---
const updateArticle = async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Retourne le document mis à jour + applique les validations
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    res.status(200).json(updatedArticle);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour.", error: err.message });
  }
};

// --- SUPPRESSION D’UN ARTICLE ---
const deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);

    if (!deletedArticle) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    res
      .status(200)
      .json({ message: "Article supprimé avec succès.", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
};

// --- EXPORT DES FONCTIONS ---
module.exports = {
  testApi,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
};
