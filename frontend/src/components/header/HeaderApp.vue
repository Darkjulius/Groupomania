<template>
    <header>
        <img src="../../assets/icon-left-font-monochrome-white.png" width="240" height="240" alt="logo gropomania" title="logo groupomania" class="img-fluid" />
        <nav class="navbarre">
            <router-link to="/home" title="Liste des articles"> <button @click="disconnect()" title="Déconnexion">Déconnexion</button></router-link>
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
</style>