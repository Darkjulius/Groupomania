<template>
    <div id="app">
        <div> <navbarre /></div>
            <div class="container">
                <h1>Mon compte</h1>
                <p><strong>Nom: </strong> {{ lastname }} </p>
                <p><strong>Prénom: </strong> {{ firstname }}</p>
                <p><strong>Email: </strong> {{ email }} </p>
                <p>Vous êtes inscrit depuis le <span><strong> {{ createdAt }} </strong></span>.</p>
                <button>Supprimer mon compte</button>
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

};
</script>