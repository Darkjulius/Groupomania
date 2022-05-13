<template>
    <div id="app">
        <div><Navbarre /></div>
        <h1>Ajoutez un article</h1>
            <form class="article" method="post">

                <div class="form-group">
                    <label for="title"></label>
                    <input 
                    type="text"
                    class="form-control"
                    id="title"
                    required
                    v-model="inputArticle.title"
                    name="title"
                    placeholder="Saisir un titre"
                    >
                </div>

                <div class="form-group">
                    <label for="content"></label>
                    <textarea 
                    type="text"
                    class="form-control"
                    id="content"
                    required
                    v-model="inputArticle.content"
                    name="content"
                    placeholder="Saisir le contenu de l'article"
                    ></textarea>
                </div>

                <button @click="sendArticle"><span>Envoyer</span></button>
                
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
            userId: "",
        };
    },
    mounted() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        console.log(this.userId);
    },
    methods: {
        sendArticle() {
            let data = {
                title: this.inputArticle.title,
                content: this.inputArticle.content,
                userId: this.userId
            };
            console.log(data);

            //Contrôle que tous les champs du formulaire d'inscription doivent être remplis.
            if(data.title == "" || data.content === "") {
                return alert("Veuillez remplir tous les champs du formulaire !!!")
            }
            
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
                alert("L'article a été enregistré");
                window.location.href="/home";
            })
            .catch(error => console.log(error));
        },
    },
}
</script>

<style scoped>
  h1{
    font-size: 24px;
    font-weight: bold;
    padding: 20px 0;
  }
  .article{
    width: 80%;
    margin: 0 auto;
    text-align: left;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
  }
  button{
    background: #122442;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    margin-top: 20px;
  }
  button:hover{
    background: #fff;
  }
  button:hover span{
    color: #122442;
    font-weight: bold;
  }
/***** RESPONSIVE *****/
@media (max-width: 335px) {
    h1{
      font-size: 20px
    }
    .form-control{
        font-size: 14px !important;
    }
    button{
        font-size: 14px;
    }
}
</style>