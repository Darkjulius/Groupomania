<template>
<div id="app">
        <div><Navbarre /></div>
        <div class="container">
            <h1 class="title">Mise à jour du compte</h1>
                <form class="form-row" method="post">

                    <div class="form-group col-md-6">
                        <label for="firstname" class="labeltext"></label>
                        <input 
                        type="text" 
                        v-model="inputModify.firstname" 
                        class="form-control" 
                        id="firstname" 
                        placeholder="Prénom" 
                        required>
                    </div>

                    <div class="form-group col-md-6">
                        <label for="lastname" class="labeltext"></label>
                        <input 
                        type="text" 
                        v-model="inputModify.lastname" 
                        class="form-control" 
                        id="lastname" 
                        placeholder="Nom" 
                        required>
                    </div>

                    <div class="form-group col-md-6">
                        <label for="username" class="labeltext"></label>
                        <input 
                        type="text" 
                        v-model="inputModify.username" 
                        class="form-control" 
                        id="username" 
                        placeholder="Pseudo" 
                        required>
                    </div>

                    <div class="form-group col-md-6">
                        <label for="email" class="labelemail"></label>
                        <input type="email" 
                        v-model="inputModify.email" 
                        class="form-control" 
                        id="email" 
                        placeholder="Adresse e-mail" 
                        required>
                    </div>

                </form>

                <div class="button-update">
                    <button 
                    type="submit" 
                    @click.prevent="modify" 
                    class="btn btn-primary">Mettre à jour</button>
                </div>
        </div>
    </div>
</template>

<script>
import Navbarre from "./header/HeaderApp.vue"

export default {
    name: "gestionAccount",
    components: {
    Navbarre,
    },
    data() {
        return {
            inputModify: {
                firstname: "",
                lastname: "",
                username: "",
                email: "",
            },
            isAdmin: localStorage.getItem("isAdmin"),
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token"),
        };
    },
    methods: {
        modify(){
            let inputDatas = {
                firstname: this.inputModify.firstname,
                lastname: this.inputModify.lastname,
                username: this.inputModify.username,
                email: this.inputModify.email,
            };
            console.log(inputDatas);
            let urlModify = `http://localhost:3000/groupomania/users/accounts/${this.userId}`;
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
                    window.location.href="/account";
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