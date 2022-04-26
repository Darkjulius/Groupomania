const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const articleCtrl = require("../controllers/article");

router.post("/add", auth, multer, articleCtrl.createArticle);             //Création d'un post.
router.get("/:id", auth, articleCtrl.getOneArticle);                      //Récupération d'un article avec l'id.
router.get("/", auth, articleCtrl.getAllArticles);                        //Récupération de tous les articles.
router.put("/:id", auth, articleCtrl.modifyArticle);                      //Modification d'un article via son id.
router.delete("/:id", auth, articleCtrl.deleteArticle);                   //Suppression d'un article via son id.

module.exports = router;