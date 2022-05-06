<template>
<div id="app">
        <div><Navbarre /></div>
        <div class="container">
            <h1 class="title">Mise à jour de l'article</h1>
                <form class="form-row" method="post">
                    <div class="form-group col-md-6">
                        <label for="title" class="labeltext"></label>
                        <input type="text" v-model="inputModify.title" class="form-control" id="title" placeholder="Titre" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="content" class="labeltext"></label>
                        <input type="text" v-model="inputModify.content" class="form-control" id="content" placeholder="Contenu" required>
                    </div>
                </form>
                <div class="buttons">
                    <button type="submit" @click.prevent="modify" class="btn btn-primary">Mettre à jour</button>
                </div>
        </div>
    </div>
</template>

<script>
import Navbarre from "../components/header/HeaderApp.vue"

export default {
    name: "gestionArticle",
    components: {
    Navbarre,
    },
    data() {
        return {
            inputModify: {
                title: "",
                content: "",
            },
            isAdmin: localStorage.getItem("isAdmin"),
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token"),
        };
    },
    methods: {
        modify(id){
            let inputDatas = {
                title: this.inputModify.title,
                content: this.inputModify.content,
            };
            console.log(inputDatas);
            let urlModify = `http://localhost:3000/groupomania/articles/${id}`;
            let options = {
                method: "PUT",
                body: JSON.stringify(inputDatas),
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
                    alert("La mise à jour de votre compte a été effectuée !!!");
                })
                .catch((error) => console.log(error));
        }
    }
};
</script>
<style scoped>
.container{
    width: 100%;
    padding-top: 10px;
}
h1{
    font-size: 24px;
    padding-top: 20px;
}
h3{
    font-size: 14px;
}
form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
}
.form-group{
    width: 70%;
    margin: 0 auto;
}
.form-control{
    font-size: 17px;
    font-style: italic;
    padding: 14px 16px;
}
input{
    border: 1px solid #D3D3D3;
}
.btn{
    margin: 20px 0;
}
.btn-primary{
    background-color: #122442 !important;
    border-color: #122442 !important;
    line-height: 48px;
    font-size: 20px;
    font-weight: bold;
    padding: 0 16px;
}
/***** RESPONSIVE *****/
@media (max-width: 410px) {
    h1{
        font-size: 16px
    }
    .form-control{
        font-size: 14px;
    }
    .btn-primary{
        font-size: 14px;
    }
    .connect{
        font-size: 12px;
    }
}
</style>