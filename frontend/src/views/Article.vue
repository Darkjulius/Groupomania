<template>
  <div id="app">
      <div> <navbarre /></div>
        <div class="container">
            <h1>Ajoutez un article</h1>
                <form class="form-row" method="post">
                    <div class="form-groug col-md-6">
                        <label for="title" class="labeltext"></label>
                        <input type="text" v-model="inputArticle.title" name="title" id="title" class="form-control" placeholder="Titre" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="content" class="labeltext"></label>
                        <textarea type="text" v-model="inputArticle.content" name="content" id="content" rows="10" class="form-control" required placeholder="Contenu"></textarea>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="urlArticle" class="labeltext"></label>
                        <input type="text" v-model="inputArticle.articleUrl" class="form-control" id="articleUrl" placeholder="URL article" required>
                    </div>
                </form>
                <button v-on:click="publishArticle">Envoyer</button>
        </div>
  </div>
</template>

<script>
import Navbarre from "../components/header/HeaderApp.vue"
export default {
    name: "newArticle",
    components: {
        Navbarre,
    },
    data() {
       return {
           inputArticle:{
               title: "",
               content: "",
               articleUrl: "",
           },
            userId: "",
            isAdmin: "",
       }
    },
    mounted() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
        console.log(localStorage, "ligne46");
    },
    methods: {
        publishArticle() {
            const contentPublishArticle = {
                title: this.inputArticle.title,
                content: this.inputArticle.content,
                articleUrl: this.inputArticle.articleUrl,
                userId: this.userId,
                isAdmin: this.isAdmin
            }
            console.log(contentPublishArticle, "ligne57");
            let urlpublishArticle = "http://localhost:3000/groupomania/articles/add"
            let options = {
                method: "POST",
                body: JSON.stringify(contentPublishArticle),
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            };
            console.log(options);
            fetch(urlpublishArticle, options)
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                alert("Article envoyé");
                this.$router.push("/home")
            })
            .catch(error => console.log(error));
        },
    },
};
</script>