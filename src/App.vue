<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Formulario from './components/Formulario.vue'
import Listar from './components/Listar.vue'
</script>

<template>
  <div class="form">
    <Formulario/>
  </div>
  <div class="list">
    <Listar/>
  </div>
  
</template>

<style scoped>
.form{
  border-right: 1px solid greenyellow;
}
.list{
  margin-left: 50px;
}
</style>
