<script setup>
import Navbar from "@/components/NavBar.vue"
</script>

<template>
  <Navbar></Navbar>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<style>
html {
  margin: 0 auto;
  /*width: 80%;*/
}

.main {
  width: 80%;
  margin: 100px  auto;
}

body {
  background-color: #222;
}

</style>