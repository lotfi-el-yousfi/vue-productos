<script setup>
import AppBar from "@/domain/main-layout/components/App-Bar.vue";
</script>
<template>
  <v-app>
    <AppBar></AppBar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>


<style scoped>

</style>
