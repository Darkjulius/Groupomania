<template>
    <div id="app">
        <div><barreHeader /></div>
        <div class="container">
            <form class="form-row" @submit.prevent="loginAccount()" method="post">
                <div class="form-group col-md-6">
                    <label for="email" class="colorLabel"></label>
                    <input v-model="inputLogin.email" type="email" class="form-control" id="email" placeholder="Email" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="password" class="colorLabel"></label>
                    <input v-model="inputLogin.password" type="password" name="password" class="form-control" id="password" placeholder="Mot de passe" autocomplete="off" required>
                </div>
                <div class="row justify-content center">
                    <button @click.prevent="loginAccount()" type="submit" class="btn btn-primary">Se connecter</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
//import axios from 'axios'
import barreHeader from "./Header.vue";

export default {
    name: 'loginAccount',
    components: {
    barreHeader,
    },
    data(){
        return{
            inputLogin: {
                email: "",
                password: "",
                error: "",
            }
            
        };
    },
    methods:{
        loginAccount(){
            let loginDatas = {
                "email": this.inputLogin.email,
                "password": this.inputLogin.password,
            }
            console.log(loginDatas);
            let urlLogin = "http://localhost:3000/groupomania/users/auth/login"
            let options = {
                method: "POST",
                body: JSON.stringify(loginDatas),
                headers: {
                    "Content-Type": "application/json"
                }
                    
            }
            fetch(urlLogin, options)
            .then(response => response.json())
            .then((response) => {
                if (response.userId && response.token){
                    localStorage.setItem("userId", response.userId);
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("username", response.username);
                    localStorage.setItem("isAdmin", response.isAdmin);
                    console.log(localStorage);
                    this.$router.push("/articles");
                    alert("Bienvenue sur Groupomania, connexion réussie !!!")
                } else {
                    alert("Mot de passe de connexion incorrect. Veuillez recommencer !!!");
                }
            })
            .catch(error => console.log(error));
        }
    },
};  
</script>

<style scoped>
.container{
    width: 100%;
    margin: 0 auto;
    padding: 20px 0;  
}
form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
}
.form-row, .form-group{
    width: 332px;
    align-items: center;
}
.form-control{
    font-size: 17px;
    padding: 14px 16px;
    font-style: italic;
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
    width: 332px;
    line-height: 48px;
    font-size: 20px;
    font-weight: bold;
    padding: 0 16px;
}
</style>