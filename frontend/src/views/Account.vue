<template>
    <div id="app">
        <div> <navbarre /></div>
            <div class="container">
                <h1>Mon compte</h1>
                <p>Nom: THIBAUL {{userAccount.lastname}}</p>
                <p>Prénom: Brice</p>
                <p>Email: bthibault@gmail.com </p>
                <p>Vous êtes inscrit depuis le <span> 02/05/2022 </span> en tant que <span>Utilisateur</span></p>
                <button>Supprimmer mon compte</button>
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
          userAccount: {
              userId: localStorage.getItem("userId"),
              isAdmin: localStorage.getItem("isAdmin"),
              firstname: "",
              lastname: "",
              email: "",
              username: "",
              createdAt: ""
          },
          token: localStorage.getItem("token"),
          userId: localStorage.getItem("userId")
      };
  },
  mounted(){
        let urlAccount = `http://localhost:3000/groupomania/users/accounts/${this.userAccount.userId}`;
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
                this.userAccount.firstname = data.firstname;
                this.userAccount.lastname = data.lastname;
                this.userAccount.email = data.email;
                this.userAccount.username = data.username;
                this.userAccount.isAdmin = data.isAdmin;
                this.userAccount.createdAt = data.createdAt;
            })
            .catch((error) => console.log(error));
  }

}
</script>