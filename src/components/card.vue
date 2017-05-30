<template>
    <div :class="{selected: selected}" class="box">
        <a href="#" @click.prevent="selectHandler(card)">
            {{ selected ? card.symbol : 'Hidden' }}
        </a>
    </div>
</template>

<script>
    export default {
        props: ['selected', 'selectHandler', 'card'],
    }
</script>

<style scoped>
    .box {
        margin: 5px;
        padding: 50px;
        text-align: center;
        border: 1px solid red;
    }

    .selected a{
        color: #ff0000;
    }
</style>