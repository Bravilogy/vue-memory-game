import Vue from 'vue';
import VueX from 'vuex';
import { concat, reject, propEq, head, eqBy, prop } from 'ramda';

Vue.use(VueX);

export default new VueX.Store({
    state: {
        cards: [
            { id: 1, symbol: 'cat' },
            { id: 2, symbol: 'dog' },
            { id: 3, symbol: 'witch' },
            { id: 4, symbol: 'horse' },
            { id: 5, symbol: 'cat' },
            { id: 6, symbol: 'dog' },
            { id: 7, symbol: 'witch' },
            { id: 8, symbol: 'horse' },
        ],
        solved: [],
        selected: [],
    },
    getters: {
        canSelectMore: ({ selected }) => selected.length !== 2,
        gameCompleted: ({ solved, cards }) => solved.length === cards.length,
    },
    mutations: {
        clear(state) {
            state.selected = [];
        },
        solve(state, cards) {
            state.solved = concat(state.solved, cards);
        },
        add(state, card) {
            state.selected = concat(state.selected, [card]);
        },
        remove(state, card) {
            state.selected = reject(propEq('id', card.id), state.selected);
        },
    },
    actions: {
        clear: ({ commit }) => commit('clear'),
        remove: ({ commit }, card) => commit('remove', card),
        solve: ({ commit }, cards) => {
            commit('solve', cards);
            commit('clear');
        },
        add: ({ commit, state, dispatch }, card) => {
            const existingCard = head(state.selected);

            existingCard && eqBy(prop('symbol'), existingCard, card)
                ? dispatch('solve', [existingCard, card])
                : commit('add', card);
        }
    }
});