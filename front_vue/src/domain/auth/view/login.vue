<script setup>


import {onMounted, ref} from "vue";
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


//lifecycle
onMounted(() => {
  if (authStore.token.length > 0) {
    router.push('/orders')
  }
})
</script>

<template>
  <v-col cols="12" sm="6" md="4" offset-sm="3" offset-md="4">
    <v-card class="pa-4">
      <v-card-title class="text-h6">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handelSubmit">
          <v-text-field
              label="User name"
              v-model="username"
              type="text"
              variant="outlined"
              density="compact"
              :disabled="isLoading"
          ></v-text-field>
          <v-text-field
              label="Password"
              v-model="password"
              type="password"
              variant="outlined"
              density="compact"
              :disabled="isLoading"
          ></v-text-field>
          <v-btn type="submit" block :disabled="isLoading" color="primary">
            Login
          </v-btn>
        </v-form>
        <div class="text-center mt-4">
          <router-link to="/register" class="text-decoration-none">
            <v-btn variant="text" color="primary" size="small">
              Register
            </v-btn>
          </router-link>
        </div>
      </v-card-text>
      <v-card-text v-if="error" class="text-center text-red">
        {{ error }}
      </v-card-text>
    </v-card>
  </v-col>
</template>

<style scoped>

</style>