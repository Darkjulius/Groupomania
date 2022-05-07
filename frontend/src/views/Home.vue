<template>
  <div id="app">
    <div><Navbarre /></div>
      <div class="container">
        <h1>Liste des articles</h1>
        <div v-for="article in articles" v-bind:key="article.id" class="articles">
          <div class="article-user">
            <p>Publié le : <strong>{{ formatDate(article.createdAt) }}</strong> par <strong> {{article.User.firstname}} {{article.User.lastname}}</strong></p>
          </div>
          <div class="article">
            <p><strong>Titre</strong>: {{ article.title }} </p>
            <p><strong>Description</strong>: {{ article.content }} </p>
          </div>
          <div class="article-actions">
            <!-- <router-link to="/modifArticle" v-if="userId === article.UserId || isAdmin == true" id="modifArticle" class="button" role="button"><button><span>Modifier</span></button></router-link> -->
            <button v-if="userId === article.UserId || isAdmin == true"
                    @click="toggleModale"
                    type="button" 
                    class="button-article"><span>Modifier</span>></button>

            <Modale v-bind:revele="revele"
                    v-bind:toggleModale="toggleModale"
                    v-bind:modifyArticle="modifyArticle"></Modale>

            <!-- Si l'utilisateur connecté est Administrateur ou Propriétaire de l'article. Il peut faire une suppression  -->
            <button v-if="userId === article.UserId || isAdmin == true" type="button" @click="destroyArticle(article.id)" class="button-article"><span>Supprimer</span></button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Navbarre from "../components/header/HeaderApp.vue"
import ModaleArticle from "../components/ModaleModifyArticle.vue"
export default {
  name: "allArticles",
  components: {
    Navbarre,
    "Modale": ModaleArticle,
  },
  data() {
    return {
      userId: "",
      isAdmin: "",
      articles: [],
      revele: false,
    };
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem("userId"));
    this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    console.log(localStorage, "ligne43");
    
    let urlAllArticles = "http://localhost:3000/groupomania/articles";
    let options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
    };
    console.log(options);
    fetch(urlAllArticles, options)
      .then((response) => response.json())
      .then((data) => {
        this.articles = [...data.data];
        console.log(this.articles,"ligne56");
      })
      .catch((error) => console.log(error));
  },
  methods: {
    //Format de la date -> article.createdAt
      formatDate(date) {
        return new Date(date).toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        });
      },

      //Affiche la ModaleArticle lors du Click sur le bouton Modifier.
      toggleModale: function(){
        this.revele = !this.revele
      },

    //Modification d'un article
      modifyArticle(id){
        let urlModify = `http://localhost:3000/groupomania/articles/${id}`;
        let options = {
          method: "PUT",
          headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json"
          },
        };
        console.log(options);
        fetch(urlModify, options)
          .then(response => response.json())
          .then((response) =>{
              console.log(response);
              this.$router.push("/home");
              alert("Votre article a été modifié !!!");
          })
          .catch((error) => console.log(error));
      },

    //Suppression d'un article
      destroyArticle(id){
        let urlDeleteArticle = `http://localhost:3000/groupomania/articles/${id}`;
        let options = {
          method: "DELETE",
          headers : {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
          },
        };
        console.log(options);
        fetch(urlDeleteArticle, options)
          .then((response) => {
            console.log(response);
            alert("Votre article a été supprimé !!!");
            window.location.reload();
          })
          .catch(error => console.log(error));
      },
  },
};
</script>
<style scoped>
  h1{
      font-size: 24px;
      font-weight: bold;
      padding: 20px 0;
  }
  .container{
    height: 100vh;
  }
  .button-article{
    margin-right: 10px;
  }
  .articles{
    width: 80%;
    margin: 0 auto;
    text-align: left;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
  }
  .article p{
    line-height: 2em;
  }
  p{
    margin: 0;
  }
  .button{
    margin-right: 10px;
  }
  button{
    background: #122442;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  button:hover{
    background: #fff;
  }
  button:hover span{
    color: #122442;
    font-weight: bold;
  }
</style>