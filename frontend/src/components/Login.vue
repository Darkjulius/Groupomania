<template>
    <div id="app">
        <div><BarreHeader /></div>
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
                    <div class="button-login">
                        <button @click.prevent="loginAccount()" type="submit" class="btn btn-primary">Se connecter</button>
                    </div>
                    <div class="homeGroupomania">
                        <h3 class="connect">Vous n'êtes pas encore inscrit ?<router-link to="/signup" class="toConnect" role="button" aria-label="S'incrire">S'inscrire</router-link></h3>
                    </div>
                </form>
            </div>
    </div>
</template>

<script>
import BarreHeader from "./header/Header.vue";

export default {
    name: 'loginAccount',
    components: {
    BarreHeader,
    },
    data(){
        return{
            userId: localStorage.getItem("userId"),
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
                    this.$router.push("/home");
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
    padding-top: 10px;
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
    line-height: 48px;
    font-size: 20px;
    font-weight: bold;
    padding: 0 16px;
}
.connect{
    font-size: 14px;
}
/***** RESPONSIVE *****/
@media (max-width: 320px) {
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
@media (max-width: 220px) {
    .form-control{
        font-size: 12px;
    }
    .btn-primary{
        font-size: 12px;
    }
    .connect{
        font-size: 11px;
    }
}
</style>