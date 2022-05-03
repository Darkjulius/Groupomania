<template>
    <div id="app">
        <div><navbarre /></div>
            <form class="article" method="post">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input 
                    type="text"
                    class="form-control"
                    id="title"
                    required
                    v-model="inputArticle.title"
                    name="title"
                    >
                </div>
                <div class="form-group">
                    <label for="content">Contenu</label>
                    <textarea 
                    type="text"
                    class="form-control"
                    id="content"
                    required
                    v-model="inputArticle.content"
                    name="content"
                    ></textarea>
                </div>
                <button @click="sendArticle" class="btn btn-success">Envoyer</button>
            </form>
    </div>
</template>
<script>
import Navbarre from "../components/header/HeaderApp.vue"
export default {
    name: "addArticle",
    components: {
        Navbarre
    },
    data(){
        return{
            inputArticle: {
                title: "",
                content: ""
            },
            userId: ""
        };
    },
    mounted() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        console.log(this.userId);
    },
    methods: {
        sendArticle() {
            let data = {
                "title": this.inputArticle.title,
                "content": this.inputArticle.content,
                "userId": this.userId
            };
            console.log(data);
            let urlAddArticle = "http://localhost:3000/groupomania/articles/add";
            let options = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
            };
            fetch(urlAddArticle, options)
            .then(response => response.json())
            .then(() => {
                window.location.reload();
                alert("L'article a été enregistré")
            })
            .catch(error => console.log(error));
        },
    },
}
</script>