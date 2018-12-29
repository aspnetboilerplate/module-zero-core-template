<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({

})
export default class App extends Vue {}
</script>

<style>
html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
#app{
  height: 100%;
}
</style>
