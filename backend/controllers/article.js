const db = require("../models");
const Article = db.Article;
const Comment = db.Comment;

//Création d'un article
exports.createArticle = (req, res, next) => {
    // vérification que tous les champs sont remplis
    const title = req.body.title;
    const content = req.body.content;
    if (title === null || title === "" || content === null || content === "") {
        return res.status(400).json({ "error": "Veuillez remplir les champs TITRE et CONTENU pour créer un article" });
    }
    const articleObject = req.body;

    // Création d'un nouvel objet article
    const article = new Article({
        ...articleObject,
        UserId: req.userId
    });
    // Enregistrement de l'objet article dans la base de données
    article.save()
        .then(() => res.status(201).json({ "message": "L'article a bien été crée !!!" }))
        .catch(() => res.status(400).json({ "error": "Impossible de créer l'article" }));
};

//Afficher tous le sarticles présent en BDD avec les informations concernant l'utilisateur qui crée l'article.
exports.getAllArticles = (req, res, next) => {
    Article.findAll({
        order: [
            //Du plus récent au plus ancien
            ['createdAt', 'DESC'],
        ],
        include: [
            {
                model: db.User,
                attributes: ["firstname", "lastname", "username", "email"],
            }
        ]
    })
        .then(articles => { console.log(articles); res.status(200).json({ data: articles }) })
        .catch(error => res.status(400).json({ error }));
};

//Afficher un article présent en BDD via l'id de l'utilisateur qui a créé l'article.
exports.getOneArticle = (req, res, next) => {
    Article.findOne({
        include: [
            {
                model: db.User,
                attributes: ["firstname", "lastname", "username", "email"],
            }
        ],

        where: { id: req.params.id }
    })
        .then(article => { console.log(article); res.status(200).json(article) })
        .catch(error => res.status(404).json({ error }));
};

// Modifier un article
exports.modifyArticle = (req, res, next) => {
    db.Article.findOne({ where: { id: req.params.id } })
        .then(() => {
            db.Article.update({
                title: req.body.title,
                content: req.body.content,
            }, { where: { id: req.params.id } })
                .then(() => res.status(200).json({ "message": "L'article a été mis à jour !!!" }))
                .catch(() => res.status(400).json({ "error": "L'article n'a pas été mis à jour !!!" }));
        })
        .catch(() => res.status(500).json({ "error": "Une erreur est survenue !!!" }))
};

// Supprimer un article
exports.deleteArticle = (req, res, next) => {
    Comment.destroy({ where: { articleId: req.params.id } })
        .then(() => Article.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "L'article a été supprimé !!!" }))
        )
        .catch(error => res.status(400).json({ error }));
};

// Supprimer un article - Administrateur
exports.deleteArticleAdmin = (req, res, next) => {
    Comment.destroy({ where: { articleId: req.params.id } })
        .then(() => Article.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "L'article a été supprimé !!!" }))
        )
        .catch(error => res.status(400).json({ error }));
};