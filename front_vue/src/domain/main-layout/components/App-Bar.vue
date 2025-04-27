<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()

const leftDrawerOpen = ref(false)
const items = [
  {icon: 'mdi-shopping', title: 'order list', to: '/orders'},
  {icon: 'mdi-shopping', title: 'new order', to: '/orders/new'},
  {icon: 'mdi-shopping', title: 'edit order', to: '/orders/edit/1'},
  {icon: 'mdi-shopping', title: 'order details', to: '/orders/1'},
  {icon: 'mdi-archive', title: 'product', to: '/product'},
  {icon: 'mdi-account-plus', title: 'user', to: '/user'},
]


</script>

<template>
  <v-navigation-drawer v-model="leftDrawerOpen" location="left" temporary>
    <v-list>
      <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          color="primary"
          variant="plain"
          :to="item.to"

      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar>
    <v-app-bar-nav-icon variant="text"
                        @click.stop="leftDrawerOpen = !leftDrawerOpen"></v-app-bar-nav-icon>
    <v-img class="mx-2" src="" contain height="40"/>
    <v-toolbar-title>E-commerce app</v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/login">
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </router-link>

  </v-app-bar>
</template>

<style scoped>
</style>