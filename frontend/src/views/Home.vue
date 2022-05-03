<template>
  <div id="app">
    <div><navbarre /></div>
      <div class="container">
        <h1>Liste des articles</h1>
        <div v-for="article in articles" v-bind:key="article.id" class="articles">
          <div class="articleUser">
            <p>Publié le : <strong>{{ formatDate(article.createdAt) }}</strong> par <strong> <!-- Régler le problème d'affichage des users --> </strong></p>
          </div>
          <div class="article">
            <p><strong>Titre</strong>: {{ article.title }} </p>
            <p><strong>Description</strong>: {{ article.content }} </p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Navbarre from "../components/header/HeaderApp.vue"
export default {
  name: "allArticles",
  components: {
    Navbarre,
  },
  data() {
    return {
      userId: "",
      isAdmin: "",
      articles: [],
    };
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem("userId"));
    this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    console.log(localStorage);
    
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
        console.log(this.articles);
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
  }
};
</script>
<style scoped>
h1{
    font-size: 24px;
    font-weight: bold;
    padding: 20px 0;
}
.articles{
  width: 80%;
  margin: 0 auto;
  text-align: left;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  padding: 20px;
  margin-bottom: 20px;
}
.article p{
  line-height: 2em;
}
p{
  margin: 0;
}

</style>