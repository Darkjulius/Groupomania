<template>
    <div id="app">
        <div><Navbarre /></div>
        <h1>Mon compte</h1>
            <div class="container">
                <p><strong>Nom: </strong><span> {{ lastname }} </span></p>
                <p><strong>Prénom: </strong><span> {{ firstname }} </span></p>
                <p><strong>Email: </strong><span> {{ email }} </span></p>
                <p>Vous êtes inscrit depuis le <span><strong> {{ formatDate(createdAt) }} </strong></span>.</p>
                <p>Dernière mise à jour du compte le <span><strong> {{ formatDate(updatedAt) }} </strong></span>.</p>
                <div class="buttons">
                    <button><router-link to="/modifAccount" class="button" role="button"><span>Modifier</span></router-link></button>
                    <button @click="deleteAccount" class="delete"><span>Supprimer</span></button>
                </div>
            </div>
    </div>
</template>

<script>
import Navbarre from "../components/header/HeaderApp.vue"
import dayjs from 'dayjs';

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
            updatedAt: "",
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
                this.updatedAt = data.user.updatedAt;
                console.log(this.firstname, this.lastname, this.email, this.createdAt, this.updatedAt);
            })
            .catch((error) => console.log(error));
    },
    methods: {
        //Format de la date -> createdAt et updatedAt
        formatDate(dateString) {
            const date = dayjs(dateString);
            return date.format('D/MM/YYYY à hh:mm')
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
                
                .then(() => {
                    window.location.href="/signup";
                })   
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
    .button{
        text-decoration: none;
    }
    .buttons{
        display: flex;
    }
    .buttons span{
        color: #fff;
    }
    button{
        background: #122442;
        border-radius: 10px;
        margin-right: 10px;
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
/***** RESPONSIVE *****/
@media (max-width: 335px) {
    h1{
      font-size: 20px
    }
    .container p{
        font-size: 14px
    }
    .buttons{
        flex-direction: column;
        justify-content: center;
    }
    .buttons span{
        font-size: 14px;
    }
    .delete{
        margin-top: 10px;
    }
}
@media (max-width: 300px) {
    h1{
      font-size: 20px
    }
    .container p{
        font-size: 13px
    }
}
@media (max-width: 265px) {
    .buttons{
        display: flex;
    }
}
</style>