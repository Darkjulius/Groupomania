<template>
    <footer>
        <nav class="footerBarre">
            <li class="item-nav">Mentions légales</li>
            <li class="item-nav">Contact</li>
        </nav>
    </footer>
</template>

<script>
export default {
    name: "footerBarre",
};
</script>
<style scoped>
.footerBarre{
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
/***** RESPONSIVE *****/
@media (max-width: 475px) {
    .footerBarre{
        flex-direction: column;
        height: auto;
    }
}
</style>