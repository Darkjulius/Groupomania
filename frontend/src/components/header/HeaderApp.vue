<template>
    <header>
        <img src="../../assets/icon-left-font-monochrome-white.png" width="240" height="240" alt="logo gropomania" title="logo groupomania" class="img-fluid" />
        <nav class="navbarre">
            <router-link to="/home"><span class="nav-barre">Accueil</span></router-link>
            <router-link to="/add"><span class="nav-barre">Ajout Article</span></router-link>
            <router-link to="/account"><span class="nav-barre">Profil</span></router-link>
            <button @click="disconnect" class="disconnect">Déconnexion</button>
        </nav>
    </header>
</template>

<script>
export default {
    name: "navBarre",
    methods: {
        disconnect(){
            localStorage.clear();
            this.$router.push("/");
        },
    },
};
</script>
<style scoped>
header{
    display: flex;
    align-items: center;
    height: 10vh;
    background-color: #122442;
}
.nav-barre{
    color: #fff;
    text-decoration: none;
    
}
</style>