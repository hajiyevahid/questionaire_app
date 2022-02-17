<template>
  <MainPage/>
</template>

<script>
import MainPage from './components/MainPage.vue'
import store from './store/index.js'

export default {
  name: 'App',
  components: {
    MainPage
  },
  store
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
