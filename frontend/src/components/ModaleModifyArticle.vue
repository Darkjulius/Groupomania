<template>
<div id="app" v-if="revele">
        <div><Navbarre /></div>
        <div class="overlay"></div>
        <div class="container">
            <h1 class="title">Mise à jour de l'article</h1>
                <form class="form-row" method="post">
                    <div class="form-group col-md-6">
                        <label for="title" class="labeltext"></label>
                        <input type="text" class="form-control" id="title" placeholder="Titre" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="content" class="labeltext"></label>
                        <input type="text" class="form-control" id="content" placeholder="Contenu" required>
                    </div>
                </form>
                <div class="buttons">
                    <div class="btn-modale btn btn-danger"
                        @click="toggleModale">x</div>
                    <button type="submit" @click="modifyArticle" class="btn btn-primary">Mettre à jour</button>
                </div>
        </div>
    </div>
</template>

<script>
import Navbarre from "../components/header/HeaderApp.vue"

export default {
    name: "ModaleArticle",
    components: {
    Navbarre,
    },
    props: ["revele", "toggleModale", "modifyArticle"],
};
</script>
<style scoped>
#app{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
}
.overlay{
    background: rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
}
.container{
    width: 100%;
    padding-top: 10px;
    background: #f1f1f1;
    border-radius: 10px;
    position: relative;
    top: 20%;
}
.btn-modale{
    position: absolute;
    top: -10px;
    right: 10px;
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