//Création de la table posts
module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("Article", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING
    },
    content: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    articleUrl: {
      allowNull: true,
      type: Sequelize.STRING
    },
  });
  return Article;
};