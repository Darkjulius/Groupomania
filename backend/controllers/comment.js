const db = require("../models");
const Comment = db.Comment;

// Créer un commentaire sur un Post
exports.createComment = (req, res, next) => {
    const commentObject = req.body;
    // Création d'un nouvel objet commentaire
    const comment = new Comment({
        ...commentObject
    });
    // Enregistrement de l'objet commentaire dans la base de données
    comment.save()
        .then(() => {
            Comment.findOne({
                order: [
                    //Du plus récent au plus ancien
                    ['createdAt', 'DESC'],
                ],
                include: [
                    {
                        model: db.User,
                        attributes: ["firstname", "lastname", "username", "email"],
                    }
                ],
                where: { articleId: req.body.ArticleId }
            })
                .then((comments) => { res.status(200).json(comments) });
        })
        .catch(() => res.status(400).json({ "error": "Impossible de créer le commentaire sur cet article !!!" }));
};

//Afficher tous les commentaires
exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        order: [
            //Du plus récent au plus ancien
            ['createdAt', 'DESC'],
        ],
        include: [
            {
                model: db.User,
                attributes: ["firstname", "lastname", "username", "email"],
            },
            {
                model: db.Article,
                attributes: ["title", "content", "articleURL"]
            }
        ]
    })
        .then(comments => { console.log(comments); res.status(200).json({ data: comments }); })
        .catch(() => res.status(400).json({ "error": "Impossbile d'afficher tous les commentaire !!!" }));
};

//Afficher un commentaire par son id
exports.getOneComment = (req, res, next) => {
    Comment.findOne({
        include: [
            {
                model: db.User,
                attributes: ["firstname", "lastname", "username", "email"],
            },
            {
                model: db.Article,
                attributes: ["title", "content", "articleURL"]
            }
        ],
        where: { id: req.params.id }
    })
        .then(comment => { console.log(comment); res.status(200).json(comment) })
        .catch(error => res.status(404).json({ error }));
};

// Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ "message": "Le commentaire a été supprimé !!!" }))
        .catch(() => res.status(400).json({ "error": "Impossible de supprimer le coommentaire !!!" }));
};