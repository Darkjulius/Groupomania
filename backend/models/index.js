require("dotenv").config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
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