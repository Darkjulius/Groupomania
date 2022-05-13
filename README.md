# Projet 7 du parcours Développeur web d'OpenClassrooms : Créez un réseau social d’entreprise 

Prérequis pour installation du projet en local:
1. Installer Node.js et donc npm.
2. Installer MySQL.
3. Installer Vue.js.

Installation:
Cloner le repository: https://github.com/Darkjulius/P7_thibault_brice.git.

Se positionner dans le dossier backend:
1. Remplir le fichier .env.example en fonction de votre base de données et le renommer en .env
2. Installer Express si besoin avec la commande "npm install express".
3. Créer dans phpMyAdmin le nom de la base de données que vous avez définis dans le fichier .env
4. Saisir la commande npm start.
5. Saisir la commande nodemon server.

Se positionner dans le dossier frontend:
1. Saisir la commande npm install.
2. Saisir la commande npm run serve.
3. L'interface client est disponible à l'URL suivante : http://localhost:8080/

Notes: Il n'y a pas de compte administrateur. Il faut le créer via l'application et se aller sur la base de données afin de passer la valeur de la colonne isAdmin de "0" à "1".
