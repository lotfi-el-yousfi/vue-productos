<script setup>


import {ref} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/domain/auth/store/authStore";
import {storeToRefs} from "pinia";

//store
const authStore = useAuthStore()
const {error, isLoading} = storeToRefs(authStore)

//router
const router = useRouter()

///data
const username = ref("admin")
const password = ref("admin")
//methods
const handelSubmit = () => {
  authStore.dispatch_login(
      username.value,
      password.value
  )
  router.push('/orders')
}

</script>

<template>
  <v-col cols="6">
    <v-alert
        v-if="error"
        type="error"
    >{{ error }}
    </v-alert>
    <v-container>
      <v-form @Submit.prevent="handelSubmit">
        <v-text-field label="user name" v-model="username" type="text">

        </v-text-field>
        <v-text-field label="password" v-model="password" type="text">

        </v-text-field>

        <v-btn type="submit" :disabled="isLoading">login</v-btn>
      </v-form>
    </v-container>
  </v-col>

</template>

<style scoped>

</style>