<template>
    <div>
        <div class="container">
            <card v-for="card in cards"
                  :card="card"
                  :selected="checkSelected(card)"
                  :selectHandler="select"
                  :key="card.id"
            ></card>
        </div>
        <section v-if="gameCompleted">
            <hr>
            <h3>Congratulations! You have completed the game.</h3>
        </section>
    </div>
</template>

<script>
    import card from './card.vue';
    import { find, propEq } from 'ramda';
    import { mapState, mapGetters, mapActions } from 'vuex';

    export default {
        components: {
            card,
        },
        computed: {
            ...mapGetters(['canSelectMore', 'gameCompleted']),
            ...mapState(['cards', 'solved', 'selected']),
        },
        methods: {
            ...mapActions(['clear', 'remove', 'add']),
            select(card) {
                if (this.isSolved(card)) return;

                if (!this.canSelectMore) this.clear();

                this.checkSelected(card) ? this.remove(card) : this.add(card);
            },
            checkSelected(card) {
                return this.isSelected(card) || this.isSolved(card);
            },
            isSolved(card) {
                return !!find(propEq('id', card.id))(this.solved);
            },
            isSelected(card) {
                return !!find(propEq('id', card.id))(this.selected);
            },
        }
    }
</script>

<style>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>