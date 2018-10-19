<template>
    <div id="app">
        <vue-time-axis :timeArr="[{endTime: 1539911782, startTime: 1539911181}]" :playTime="1539911782" @exportSelTime="timeAxisSelTime"></vue-time-axis>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    methods: {
        timeAxisSelTime (a) {
            console.log(123)
        }
    },
    components: {
    }
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
