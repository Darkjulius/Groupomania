<template>
    <div id="app">
        <div><Navbarre /></div>
        <h1>Mon compte</h1>
            <div class="container">
                <p><strong>Nom: </strong><span>{{ lastname }}</span></p>
                <p><strong>Prénom: </strong> {{ firstname }}</p>
                <p><strong>Email: </strong> {{ email }} </p>
                <p>Vous êtes inscrit depuis le <span><strong> {{ formatDate(createdAt) }} </strong></span>.</p>
                <router-link to="/modifAccount" class="button" role="button"><button><span>Modifier</span></button></router-link>
                <button @click="deleteAccount"><span>Supprimer</span></button>
            </div>
    </div>
</template>

<script>
import Navbarre from "../components/header/HeaderApp.vue"

export default {
    name: "gestionAccount",
    components: {
    Navbarre,
    },
    data() {
        return {
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            isAdmin: localStorage.getItem("isAdmin"),
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token"),
            createdAt: "",
        };
    },
    created(){
        let urlAccount = `http://localhost:3000/groupomania/users/accounts/${this.userId}`;
        let options = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
        };
        console.log(options);
        fetch(urlAccount, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.firstname = data.user.firstname;
                this.lastname = data.user.lastname;
                this.email = data.user.email;
                this.username = data.user.username;
                this.createdAt = data.user.createdAt;
                console.log(this.firstname, this.lastname, this.email, this.createdAt);
            })
            .catch((error) => console.log(error));
    },
    methods: {
        //Format de la date -> article.createdAt
        formatDate(date) {
            return new Date(date).toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            });
        },

        //Suppression du compte
        deleteAccount(){
            let urlAccount = `http://localhost:3000/groupomania/users/accounts/${this.userId}`;
            let options = {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
            };
            console.log(options);
            fetch(urlAccount, options)
                .then((response) => {
                    console.log(response);
                    localStorage.clear();
                    alert("Le compte a été supprimé !!!");
                })
                .then(this.$router.push("/signup"))
                .catch(error => console.log(error));
        },
    },
};
</script>
<style scoped>
    h1{
        font-size: 24px;
        font-weight: bold;
        padding: 20px 0;
    }
    .container{
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
    }
    button:hover{
        background: #fff;
    }
    button:hover span{
        color: #122442;
        font-weight: bold;
    }
</style>