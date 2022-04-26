 <template>
    <header>
        <img src="../assets/icon-left-font-monochrome-white.png" width="240" height="240" alt="logo gropomania" title="logo groupomania" class="logo" />
    </header>
</template>

<script>
    export default {
    name: 'barreHeader',
    }
</script>

<style scoped>
header{
    display: flex;
    align-items: center;
    height: 10vh;
    background-color: #122442;
}
.logo{
    margin: 0 auto;
}
</style>