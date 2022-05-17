<template>
    <div id="app">
        <div><Navbarre /></div>
        <h1>Ajoutez un article</h1>
            <form 
            class="article"
            @submit.prevent="sendArticle()"
            enctype="multipart/form-data"
            method="post">

                <div class="form-group">
                    <label for="title"></label>
                    <input 
                    type="text"
                    class="form-control"
                    id="title"
                    required
                    v-model="title"
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
                    v-model="content"
                    name="content"
                    placeholder="Saisir le contenu de l'article"
                    ></textarea>
                </div>

                <div class="form-group">
                    <label for="image"></label>
                    <input 
                    type="file"
                    class="form-control"
                    id="image"
                    ref="image"
                    @change="selectedFile()"
                    >
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
            title: "",
            content: "",
            imageURL: "",
            image: "",
            userId: "",
        };
    },
    mounted() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        console.log(this.userId);
    },
    methods: {
        selectedFile(){
            this.image = this.$refs.image.files[0];
            this.imageURL = URL.createObjectURL(this.image);
        },
        sendArticle() {
            const formData = new FormData();
            formData.append("title", document.getElementById("title").value);
            formData.append("content", document.getElementById("content").value);
            formData.append("image", this.image);
            formData.append("userId", this.userId)
            console.log("test", formData.get("title"));
            console.log("test", formData.get("content"));
            console.log("test", formData.get("image"));
            console.log("test", formData.get("userId"));
            
            //Contrôle que tous les champs du formulaire d'inscription doivent être remplis.
            if(formData.get("title") == "" || formData.get("content") == "") {
                return alert("Veuillez remplir tous les champs du formulaire !!!")
            } else {
                fetch("http://localhost:3000/groupomania/articles/add", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        // "Content-Type": "multipart/form-data"
                    }
                })
                .then(response => response.json())
                    .then(() => {
                        alert("L'article a été enregistré");
                        window.location.href="/home";
                    })
                .catch(error => console.log(error));
            } 
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