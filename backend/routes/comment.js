const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require('../controllers/comment');

router.post("/add", auth, commentCtrl.createComment);                        //Création d'un commentaire.
router.get("/", auth, commentCtrl.getAllComments);                           //Récupération de tous les commentaires d'un Article.
router.get("/:id", auth, commentCtrl.getOneComment);                         //Récupération du commentaire d'un article.
router.delete('/:id', auth, commentCtrl.deleteComment);                      //Suppression d'un commentaire d'un article.

module.exports = router;