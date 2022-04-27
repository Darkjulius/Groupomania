<template>
  <div class="container">
    <div>
      <h1 class="card-titlepost">Visualisation de tous les articles !!!</h1>
    </div>
    <p
      v-for="article in articles" :key="article"
    >
      <!-- {{ article[0].title }} A garder car Ok sauf que je veux que tout s'affiche-->
      {{ article }}
    </p>
  </div>
</template>

<script>
export default {
  name: "allArticles",
  data() {
    return {
      userId: "",
      isAdmin: "",
      articles: [],
    };
  },
  mounted() {
    this.userId = JSON.parse(localStorage.getItem("userId"));
    this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    console.log(localStorage);

    let urlAllArticles = "http://localhost:3000/groupomania/articles";
    let options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    console.log(options);
    fetch(urlAllArticles, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.articles = data;
        console.log(this.articles);
      })
      .catch((error) => console.log(error));
  },
};
</script>
