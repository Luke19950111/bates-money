<template>
    <div class="nav-wrapper">
        <div class="content">
            money
        </div>
        <Nav/>
    </div>
</template>

<script lang="ts">

</script>

<style lang="scss" scoped>
    .nav-wrapper{
        display: flex;
        flex-direction: column;
        height: 100vh;
        border: 1px solid green;
    }
    .content{
        border: 1px solid blue;
        overflow: auto;
        flex-grow: 1;
    }
</style>