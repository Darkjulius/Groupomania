<template>
    <header>
        <nav class="navbarre">
            <router-link to="/home" class="router-link"><li class="item-nav">Accueil</li></router-link>
            <router-link to="/add" class="router-link"><li class="item-nav">Ajout Article</li></router-link>
            <router-link to="/account" class="router-link"><li class="item-nav">Profil</li></router-link>
            <li @click="disconnect" class="item-nav disconnect">Déconnexion</li>
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
.navbarre{
    width: 100%;
    height: 10vh;
    background: #122442;
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
}
.item-nav{
    font-size: 20px;
    margin: 0 10px;
    color: #fff;
    cursor: pointer;
}
.disconnect{
    font-weight: bold;
}
.router-link{
    text-decoration: none;
}
/***** RESPONSIVE *****/
@media (max-width: 475px) {
    .navbarre{
        flex-direction: column;
        height: auto;
    }
}
</style>