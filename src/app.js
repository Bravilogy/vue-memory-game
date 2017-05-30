import Vue from 'vue';
import store from './store';
import Application from './components/application.vue';

new Vue({
    store,
    el: '#app',
    render: h => h(Application)
});