<template>
    <div id="app">
        <div><BarreHeader /></div>
        <div class="container">
            <h1 class="title">Pour rejoindre la communauté, remplisser le formulaire d'inscription</h1>
                <form class="form-row" @submit.prevent="signup()" method="post">
                    <div class="form-group col-md-6">
                        <label  for="firstname" class="labeltext"></label>
                        <input  type="text" 
                                v-model="inputSignup.firstname"
                                class="form-control"
                                id="firstname"
                                placeholder="Prénom"
                                required>
                    </div>
                    <div class="form-group col-md-6">
                        <label  for="lastname" class="labeltext"></label>
                        <input  type="text"
                                v-model="inputSignup.lastname"
                                class="form-control"
                                id="lastname"
                                placeholder="Nom"
                                required>
                    </div>
                    <div class="form-group col-md-6">
                        <label  for="username" class="labeltext"></label>
                        <input  type="text"
                                v-model="inputSignup.username"
                                class="form-control"
                                id="username"
                                placeholder="Pseudo"
                                required>
                    </div>
                    <div class="form-group col-md-6">
                        <label  for="email" class="labelemail"></label>
                        <input  type="email"
                                v-model="inputSignup.email"
                                class="form-control"
                                id="email"
                                name="email"
                                placeholder="Adresse e-mail"
                                required>
                    </div>
                    <div class="form-group col-md-6">
                        <label  for="password" class="labelpassword"></label>
                        <input  type="password"
                                v-model="inputSignup.password"
                                class="form-control"
                                id="password"
                                name="password"
                                placeholder="Mot de passe"
                                autocomplete="off"
                                required>
                    </div>
                </form>
                <div class="button-signup">
                    <button type="submit" @click.prevent="signup" class="btn btn-primary">S'inscrire</button>
                </div>
            <h3 class="connect">Vous avez déjà un compte ?
            <router-link to="/" class="toconnect" role="button" aria-label="se connecter"><div class="signup">Se connecter</div></router-link>
            </h3>
        </div>
    </div>
</template>

<script>
import BarreHeader from "../components/header/Header.vue";

export default {
    name: 'signupAccount',
    components: {
    BarreHeader,
    },
    data(){
        return{
            inputSignup: {
                firstname: "",
                lastname: "",
                username: "",
                email: "",
                password: "",
            },
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

            //Contrôle que tous les champs du formulaire d'inscription doivent être remplis.
            if(inputDatas.firstname == "" || inputDatas.lastname === "" || inputDatas.username === "") {
                return alert("Veuillez remplir tous les champs du formulaire !!!")
            }

            //Contrôle de l'email saisi dans le formulaire d'inscription.
            let email = document.getElementById("email");
            let emailRegexp = new RegExp('^[a-zA-Z0-9_.-]+@{1}[a-zA-Z0-9-]+[.]{1}[a-zA-Z0-9-.]{2,10}$');
            if (!emailRegexp.test(email.value)){
                  return alert("Le format de l'email n'est pas valide")
            }

            //Contrôle du passsword saisi dans le formulaire d'inscription.
            let password = document.getElementById("password");
            let passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$');
            if (!passwordRegex.test(password.value)){
                return alert("Le mot de passe n'est pas valide doit comporter 8 à 20 caractères et inclure au moins 1 majuscule, 1 minuscule et 1 chiffre")
            }

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
                window.location.href="/";
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
.signup{
    margin-top: 10px;
}
/***** RESPONSIVE *****/
@media (max-width: 406px) {
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