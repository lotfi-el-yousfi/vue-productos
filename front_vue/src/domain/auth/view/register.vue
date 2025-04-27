<script setup>


import {computed, onMounted, ref} from "vue";
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
  authStore.dispatch_register(
      username.value,
      password.value
  )
  router.push('/orders')
}
//computed


</script>
<template>
  <v-col cols="6" offset="2">
    <v-card class="pa-4" outlined elevation="2">
      <v-card-title class="text-h5">Register</v-card-title>
      <v-card-text>
        <v-alert
            v-if="error"
            type="error"
            dismissible
            class="mb-4"
        >
          {{ error }}
        </v-alert>

        <v-form @submit.prevent="handelSubmit">
          <v-text-field
              label="User Name"
              v-model="username"
              type="text"
              :disabled="isLoading"
              required
              outlined
              dense
              class="mb-3"
          ></v-text-field>

          <v-text-field
              label="Password"
              v-model="password"
              type="password"
              :disabled="isLoading"
              required
              outlined
              dense
              class="mb-4"
          ></v-text-field>

          <v-btn
              type="submit"
              :disabled="isLoading"
              color="primary"
              block
          >
            Register
          </v-btn>
        </v-form>

        <v-divider class="my-4"></v-divider>

        <router-link to="/login" class="text-decoration-none">
          <v-btn variant="text" color="primary" size="small">
            Already have an account? Login
          </v-btn>
        </router-link>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<style scoped>

</style>