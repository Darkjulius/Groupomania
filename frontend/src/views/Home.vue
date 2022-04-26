<template>
    <div class="homeGroupomania">
        <login />
        <h3 class="connect">
            Vous n'êtes pas encore inscrit ?
            <router-link to="/signup" class="toConnect" role="button" aria-label="S'incrire">S'inscrire</router-link>
        </h3>
    </div>
</template>
<script>
import Login from "../components/Login.vue"
export default {
    name: "groupomaniaHome",
    components: {
        Login,
    },
    data(){
        return{
            userId: localStorage.getItem("userId"),
        };
    },
};
</script>

<style scoped>
h3{
    font-size: 14px;
    padding: 20px 0;
}
</style>