//Initialisation de Sequelize à partir du fichier de configuration.
const config = require("../configuration/config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.bd, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Modèles utilisés pour les actions CRUD -> Create, Read, Update et Delete.
db.User = require("./user")(sequelize, Sequelize);
db.Article = require("./article")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);

//Liaision entre les tables.

/**Table User **/
db.User.hasMany(db.Article, {
  onDelete: "CASCADE",
});
db.User.hasMany(db.Comment, {
  onDelete: "CASCADE",
});

/**Table Article **/
db.Article.belongsTo(db.User, {
  foreignKey: {
    allowNumm: false,
  },
  onDelete: "CASCADE",
});
db.Article.hasMany(db.Comment, {
  onDelete: "CASCADE",
});

/**Table Comment **/
db.Comment.belongsTo(db.User, {
  foreignKey: {
    allowNumm: false,
  },
  onDelete: "CASCADE",
});
db.Comment.belongsTo(db.Article, {
  foreignKey: {
    allowNumm: false,
  },
  onDelete: "CASCADE",
});

module.exports = db;