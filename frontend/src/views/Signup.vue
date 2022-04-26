<template>
    <div id="app">
        <div><barreHeader /></div>
        <div class="container">
            <h1 class="title">Pour rejoindre la communauté, remplisser le formulaire d'inscription</h1>
                <form class="form-row" @submit.prevent="signup()" method="post">
                    <div v-if="error" class="alert alert-danger" role="alert">
                        {{error}}
                    </div>
                    <div class="form-group col-md-6">
                        <label for="firstname" class="labeltext"></label>
                        <input type="text" v-model="inputSignup.firstname" class="form-control" id="firstname" placeholder="Prénom" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="lastname" class="labeltext"></label>
                        <input type="text" v-model="inputSignup.lastname" class="form-control" id="lastname" placeholder="Nom" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="username" class="labeltext"></label>
                        <input type="text" v-model="inputSignup.username" class="form-control" id="username" placeholder="Pseudo" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="email" class="labelemail"></label>
                        <input type="email" v-model="inputSignup.email" class="form-control" id="email" placeholder="Adresse e-mail" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="password" class="labelpassword"></label>
                        <input type="password" v-model="inputSignup.password" class="form-control" id="password" placeholder="Mot de passe" autocomplete="off" required>
                    </div>
                    
                </form>
                <div class="row justify-content-center">
                    <button type="submit" @click.prevent="signup" class="btn btn-primary">S'inscrire</button>
                </div>
            <h3 class="connect">Vous avez déjà un compte ?
            <router-link to="/" class="toconnect" role="button" aria-label="se connecter">Se connecter</router-link>
            </h3>
        </div>
    </div>
</template>

<script>
import barreHeader from "../components/Header.vue";

export default {
    name: 'signupAccount',
    components: {
    barreHeader,
    },
    data(){
        return{
            inputSignup: {
                firstname: "",
                lastname: "",
                username: "",
                email: "",
                password: "",
                error: "",
            }
        }
    },
    methods: {
        signup(){
            let inputDatas = {
                firstname: this.inputSignup.firstname,
                lastname: this.inputSignup.lastname,
                username: this.inputSignup.username,
                email: this.inputSignup.email,
                password: this.inputSignup.password,
            }
            console.log(inputDatas);
            let urlSignup = "http://localhost:3000/groupomania/users/auth/signup"
            let options = {
                method: "POST",
                body: JSON.stringify(inputDatas),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            console.log(options);
            fetch(urlSignup, options)
            .then(response => response.json())
            .then(() =>{
                this.$router.push("/");
                alert("Bienvenue sur Groupomania. Votre compte a été créé donc vous pouvez vous connecter à présent !!!");
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
h1{
    font-size: 24px;
    padding: 20px 0;
}
h3{
    font-size: 14px;
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
    width: 332px;
    line-height: 48px;
    font-size: 20px;
    font-weight: bold;
    padding: 0 16px;
}
</style>